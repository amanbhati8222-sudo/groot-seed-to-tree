const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const modal = $('#registerModal');
const form = $('#registrationForm');
const success = $('#successState');
const menu = $('.mobile-menu');
const menuToggle = $('.menu-toggle');

function openModal(){
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  setTimeout(()=>form?.querySelector('input')?.focus(),80);
}
function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
$$('[data-open-register]').forEach(b=>b.addEventListener('click',openModal));
$$('[data-close-register]').forEach(b=>b.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{ if(e.key==='Escape' && modal.classList.contains('open')) closeModal(); });

form.addEventListener('submit',e=>{
  e.preventDefault();
  if(!form.reportValidity()) return;
  form.hidden=true;
  success.hidden=false;
});
$$('.success-state [data-close-register]').forEach(b=>b.addEventListener('click',()=>{success.hidden=true;form.hidden=false;form.reset();}));

menuToggle.addEventListener('click',()=>{
  const open=menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',open);
  menu.setAttribute('aria-hidden',!open);
});
$$('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
},{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));

const stages=[
  {label:'SEED',title:'Start with<br>curiosity.',desc:'Every meaningful build starts with a question, a blank canvas or a small idea worth following.',img:'assets/groot-pot.png'},
  {label:'SPROUT',title:'Let ideas<br>take root.',desc:'Give curiosity a little structure. Learn, test, ask and keep moving.',img:'assets/groot-full.png'},
  {label:'SAPLING',title:'Build with<br>intention.',desc:'Practice turns into craft when you make the work real and learn from the result.',img:'assets/groot-cinematic.png'},
  {label:'TREE',title:'Grow beyond<br>yourself.',desc:'The goal is not to finish growing. It is to carry what you learned into what comes next.',img:'assets/groot-dark.jpg'}
];
const stageImage=$('#stageImage'), stageNumber=$('.stage-number'), stageLabel=$('.stage-label'), stageTitle=$('.stage-copy h3'), stageDesc=$('.stage-description'), fill=$('#progressFill');
$$('.stage-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const i=Number(btn.dataset.stage), s=stages[i];
    $$('.stage-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
    stageImage.style.opacity='0'; stageImage.style.transform='scale(.96)';
    setTimeout(()=>{
      stageImage.src=s.img;
      stageImage.style.opacity='1'; stageImage.style.transform='scale(1)';
    },180);
    stageNumber.textContent=`0${i+1}`;
    stageLabel.textContent=s.label;
    stageTitle.innerHTML=s.title;
    stageDesc.textContent=s.desc;
    fill.style.height=`${(i+1)*25}%`;
  });
});

const glow=$('.cursor-glow');
window.addEventListener('pointermove',e=>{
  glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px';
},{passive:true});
