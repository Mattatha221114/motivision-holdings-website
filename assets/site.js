(() => {
 const menu=document.getElementById('mb'),nav=document.getElementById('nv');
 const closeDrops=()=>document.querySelectorAll('.drop-toggle').forEach(b=>{b.setAttribute('aria-expanded','false');document.getElementById(b.getAttribute('aria-controls')).hidden=true;});
 menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));if(!open)closeDrops();});
 document.querySelectorAll('.drop-toggle').forEach(b=>b.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')!=='true';closeDrops();b.setAttribute('aria-expanded',String(open));document.getElementById(b.getAttribute('aria-controls')).hidden=!open;}));
 document.addEventListener('click',e=>{if(!e.target.closest('.nav-group'))closeDrops();if(!e.target.closest('header')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){const active=document.querySelector('.drop-toggle[aria-expanded=true]');closeDrops();if(active)active.focus();else{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus();}}});
 const openResource=()=>{const id=decodeURIComponent(location.hash.slice(1)),target=document.getElementById(id);if(target?.matches('details'))target.open=true;};openResource();addEventListener('hashchange',openResource);
 if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('pending');observer.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll('section .card,section h2,.resource-group,.st').forEach(el=>{el.classList.add('reveal','pending');observer.observe(el);});}
})();
// Gentle pointer response for the shared hero illustration.
if (matchMedia('(hover:hover) and (pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
 document.querySelectorAll('.hero-visual').forEach(visual=>{
  visual.addEventListener('pointermove',event=>{const box=visual.getBoundingClientRect();visual.style.setProperty('--hero-x',((event.clientX-box.left)/box.width-.5)*12+'px');visual.style.setProperty('--hero-y',((event.clientY-box.top)/box.height-.5)*12+'px');});
  visual.addEventListener('pointerleave',()=>{visual.style.setProperty('--hero-x','0px');visual.style.setProperty('--hero-y','0px');});
 });
}
// Varied, short transitions between local pages. Navigation remains native for
// downloads, external links, anchors, modified clicks and reduced motion.
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const main=document.querySelector('main');if(!main||!main.animate)return;
 const key='motivision-page-motion';let busy=false;
 const variants=[
  {name:'fade',enter:[{opacity:0},{opacity:1}],exit:[{opacity:1},{opacity:0}]},
  {name:'rise',enter:[{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],exit:[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-10px)'}]},
  {name:'glide',enter:[{opacity:0,transform:'translateX(20px)'},{opacity:1,transform:'translateX(0)'}],exit:[{opacity:1,transform:'translateX(0)'},{opacity:0,transform:'translateX(-12px)'}]},
  {name:'focus',enter:[{opacity:0,transform:'scale(.987)',filter:'blur(2px)'},{opacity:1,transform:'scale(1)',filter:'blur(0px)'}],exit:[{opacity:1,filter:'blur(0px)'},{opacity:0,filter:'blur(2px)'}]}
 ];
 let last=-1;try{const stored=JSON.parse(sessionStorage.getItem(key)||'null');if(stored){last=stored.index;if(stored.destination===location.href&&!reduced.matches){main.dataset.pageTransition=variants[last].name;main.animate(variants[last].enter,{duration:360,easing:'cubic-bezier(.2,.7,.2,1)'});}}}catch{}
 addEventListener('pageshow',event=>{busy=false;if(event.persisted)main.getAnimations().forEach(a=>a.cancel());});
 document.addEventListener('click',event=>{
  if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||reduced.matches)return;
  const link=event.target.closest('a[href]');if(!link||link.hasAttribute('download')||(link.target&&link.target!=='_self'))return;
  let target;try{target=new URL(link.href,location.href);}catch{return;}
  if(target.origin!==location.origin||target.protocol!==location.protocol||!target.pathname.endsWith('.html')||target.pathname===location.pathname)return;
  if(location.protocol==='file:'&&!target.pathname.startsWith(new URL(document.querySelector('script[src$="site.js"]').src).pathname.replace(/assets\/site\.js$/,'')))return;
  event.preventDefault();if(busy)return;busy=true;
  const index=(last+1)%variants.length;try{sessionStorage.setItem(key,JSON.stringify({index,destination:target.href}));}catch{}
  main.dataset.pageTransition=variants[index].name;
  const motion=main.animate(variants[index].exit,{duration:150,easing:'ease-in',fill:'forwards'});
  motion.finished.catch(()=>{}).then(()=>location.assign(target.href));
 });
})();
// Small, bounded surface tilts follow the cursor without moving the layout.
if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
 document.querySelectorAll('.card,.approach-panel,.resource-links>a,.about-photo,.founders>div').forEach(surface=>{
  surface.addEventListener('pointermove',event=>{const box=surface.getBoundingClientRect(),x=(event.clientX-box.left)/box.width,y=(event.clientY-box.top)/box.height;surface.style.setProperty('--tilt-x',(0.5-y)*3+'deg');surface.style.setProperty('--tilt-y',(x-0.5)*3+'deg');surface.style.setProperty('--surface-x',x*100+'%');surface.style.setProperty('--surface-y',y*100+'%');});
  surface.addEventListener('pointerleave',()=>{surface.style.setProperty('--tilt-x','0deg');surface.style.setProperty('--tilt-y','0deg');});
 });
}

