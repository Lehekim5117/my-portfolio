(function(){
  const c=document.getElementById('particles-canvas');
  const ctx=c.getContext('2d');
  let W,H,pts=[];
  function resize(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  for(let i=0;i<80;i++)pts.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.5+0.3,vx:(Math.random()-0.5)*0.3,vy:(Math.random()-0.5)*0.3,a:Math.random()});
  function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;
      if(p.y<0)p.y=H;if(p.y>H)p.y=0;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${p.a*0.4})`;ctx.fill();
    });
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<120){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(124,106,255,${(1-d/120)*0.12})`;ctx.lineWidth=0.5;ctx.stroke();}
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

const cur=document.getElementById('cur'),trail=document.getElementById('cur-trail');
let mx=0,my=0,tx=0,ty=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.transform=`translate(${mx-4}px,${my-4}px)`;});
(function anim(){tx+=(mx-tx)*0.1;ty+=(my-ty)*0.1;trail.style.transform=`translate(${tx-16}px,${ty-16}px)`;requestAnimationFrame(anim);})();
document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>{cur.style.transform+=' scale(3)';trail.style.opacity='0.4';});el.addEventListener('mouseleave',()=>{trail.style.opacity='1';});});

const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show');});},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

const barObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('[data-w]').forEach(b=>{b.style.width=b.dataset.w+'%';});}});},{threshold:0.2});
document.querySelectorAll('.sk-group,.floating-card').forEach(el=>barObs.observe(el));

(function(){
  const roles=['Front-End','Game Development','Back-End','Full-Stack','Mobile App'];
  const el=document.getElementById('typed-role');
  if(!el)return;
  let ri=0,ci=0,deleting=false;
  function tick(){
    const word=roles[ri];
    if(!deleting){
      ci++;
      el.textContent=word.slice(0,ci);
      if(ci===word.length){deleting=true;setTimeout(tick,1400);return;}
    } else {
      ci--;
      el.textContent=word.slice(0,ci);
      if(ci===0){deleting=false;ri=(ri+1)%roles.length;setTimeout(tick,300);return;}
    }
    setTimeout(tick,deleting?40:90);
  }
  tick();
})();

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
  });
});