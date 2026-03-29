// ── THROTTLE UTILITY ──
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ── CURSOR ──
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
function animRing(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing);}
animRing();
document.querySelectorAll('a,button').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.classList.add('expanded');ring.classList.add('expanded');});
  el.addEventListener('mouseleave',()=>{cur.classList.remove('expanded');ring.classList.remove('expanded');});
});

// ── HEADER ── (with throttled scroll listener)
const hdr = document.getElementById('header');
const handleScroll = throttle(() => {
  hdr.classList.toggle('scrolled', scrollY > 60);
}, 50);
window.addEventListener('scroll', handleScroll, {passive:true});

// ── MOBILE MENU ──
const mBtn=document.getElementById('mobile-btn');
const nav=document.getElementById('nav');
mBtn.addEventListener('click',()=>{nav.classList.toggle('open');});
document.querySelectorAll('.nav-link,.nav-cta').forEach(l=>l.addEventListener('click',()=>nav.classList.remove('open')));

// ── HERO VIDEO FADE IN ──
const hv = document.getElementById('heroVideo');
hv.addEventListener('loadeddata',()=>hv.classList.add('loaded'));
hv.addEventListener('canplay',()=>hv.classList.add('loaded'));
hv.addEventListener('playing',()=>hv.classList.add('loaded'));
hv.load();
setTimeout(()=>hv.classList.add('loaded'),300);

// ── GALLERY FILTER ── (with fade transition)
document.querySelectorAll('.gtab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.gtab').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    const f=tab.dataset.filter;
    const items = document.querySelectorAll('.gitem');

    // Add fade-out effect
    items.forEach(item => {
      item.style.opacity = '0';
      item.style.transition = 'opacity 0.3s ease';
    });

    // Toggle visibility and fade-in
    setTimeout(() => {
      items.forEach(item=>{
        const shouldHide = f!=='all' && item.dataset.category!==f;
        item.classList.toggle('hidden', shouldHide);
        if (!shouldHide) {
          item.style.opacity = '1';
        }
      });
    }, 150);
  });
});

// ── DUPLICATE TESTIMONIALS FOR INFINITE SCROLL ──
const track = document.getElementById('depTrack');
track.innerHTML += track.innerHTML;

// ── FADE UP ON SCROLL ──
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:0.08,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    const href=this.getAttribute('href');
    if(href==='#')return;
    e.preventDefault();
    const target=document.querySelector(href);
    if(target)window.scrollTo({top:target.offsetTop-78,behavior:'smooth'});
  });
});

// ── NOTIFY FORM HANDLER ──
function handleNotifySubmit(event) {
  event.preventDefault();
  const email = document.getElementById('notifyForm').querySelector('input[type="email"]').value;
  if(email) {
    const message = `Olá! Quero ser avisado sobre cursos. Email: ${email}`;
    window.location.href = `https://wa.me/5591981172525?text=${encodeURIComponent(message)}`;
  }
}

const notifyForm = document.getElementById('notifyForm');
if(notifyForm) {
  notifyForm.addEventListener('submit', handleNotifySubmit);
}
