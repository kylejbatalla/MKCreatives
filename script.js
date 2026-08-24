// Year
document.getElementById('yr').textContent = new Date().getFullYear();

// Nav scroll state
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

// Mobile menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const toggleMenu = () => { burger.classList.toggle('open'); navLinks.classList.toggle('open'); };
burger.addEventListener('click', toggleMenu);
burger.addEventListener('keypress', e => { if(e.key==='Enter'||e.key===' ') toggleMenu(); });
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open'); navLinks.classList.remove('open');
}));

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, {threshold:.14});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Booking form -> mailto
const form = document.getElementById('bookForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target;
  if(!f.name.value.trim() || !f.email.value.trim()){
    note.textContent = 'Please add your name and email so I can reply.';
    note.classList.remove('ok'); return;
  }
  const subject = encodeURIComponent(`Booking Request — ${f.service.value} — ${f.name.value}`);
  const body = encodeURIComponent(
    `Name: ${f.name.value}\nEmail: ${f.email.value}\nService: ${f.service.value}\nEvent Date: ${f.date.value || 'TBD'}\n\nDetails:\n${f.details.value || '(none provided)'}`
  );
  window.location.href = `mailto:booking@mkcreatives.com?subject=${subject}&body=${body}`;
  note.textContent = 'Opening your email app… if nothing happens, email booking@mkcreatives.com directly.';
  note.classList.add('ok');
});
