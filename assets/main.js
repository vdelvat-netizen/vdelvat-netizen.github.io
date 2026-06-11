(function(){
  "use strict";
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- year ---------- */
  var yr = document.getElementById('yr'); if(yr) yr.textContent = new Date().getFullYear();

  /* ---------- active nav (per page) ---------- */
  (function(){
    var file = (location.pathname.split('/').pop() || 'index.html');
    var key = file.replace('.html','');
    document.querySelectorAll('[data-nav]').forEach(function(a){
      if(a.getAttribute('data-nav') === key) a.classList.add('active');
    });
  })();

  /* ---------- hero load reveal ---------- */
  var heroH1 = document.querySelector('.hero h1');
  if(heroH1){
    window.requestAnimationFrame(function(){
      heroH1.classList.add('in');
      document.querySelectorAll('.hero .r-up').forEach(function(el){ el.classList.add('in'); });
    });
  }

  /* ---------- scroll progress + nav shrink ---------- */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('progress');
  var ticking = false;
  function onScroll(){
    var st = window.scrollY || window.pageYOffset;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if(progress) progress.style.transform = 'scaleX(' + (h>0 ? st/h : 0) + ')';
    if(nav) nav.classList.toggle('shrunk', st > 40);
    ticking = false;
  }
  window.addEventListener('scroll', function(){ if(!ticking){ window.requestAnimationFrame(onScroll); ticking = true; } }, {passive:true});
  onScroll();

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.r-up, .sec-head');
  if('IntersectionObserver' in window && !reduce){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
    revealEls.forEach(function(el){ if(!el.closest('.hero')) io.observe(el); });
  } else { revealEls.forEach(function(el){ el.classList.add('in'); }); }

  /* ---------- journey map ---------- */
  (function(){
    var journey = document.getElementById('journey');
    if(!journey) return;
    var route = document.getElementById('route');
    var motion = document.getElementById('planeMotion');
    var planeWrap = journey.querySelector('.plane-wrap');
    var len = 0; try{ len = route.getTotalLength(); }catch(e){}
    journey.style.setProperty('--len', len || 1600);
    function launch(){
      journey.classList.add('in');
      if(reduce){
        if(motion) motion.remove();
        var p; try{ p = route.getPointAtLength(len); }catch(e){ p = {x:747,y:340}; }
        if(planeWrap) planeWrap.querySelector('.plane').setAttribute('transform','translate('+p.x+','+p.y+')');
        return;
      }
      if(motion && motion.beginElement){ try{ motion.beginElement(); }catch(e){} }
    }
    if('IntersectionObserver' in window){
      var jo = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if(e.isIntersecting){ launch(); jo.unobserve(e.target); } });
      }, {threshold:0.35});
      jo.observe(journey);
    } else { launch(); }
  })();

  /* ---------- expandable jobs ---------- */
  document.querySelectorAll('[data-job]').forEach(function(job){
    job.addEventListener('click', function(){
      var isOpen = job.classList.contains('open');
      document.querySelectorAll('[data-job].open').forEach(function(o){ if(o!==job) o.classList.remove('open'); });
      job.classList.toggle('open', !isOpen);
    });
  });

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('menu');
  if(toggle && menu){
    toggle.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true':'false');
      toggle.setAttribute('aria-label', open ? 'Close menu':'Open menu');
      document.body.style.overflow = open ? 'hidden':'';
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ menu.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); document.body.style.overflow=''; });
    });
  }

  /* ---------- cursor + magnetic + tilt (desktop, motion-on) ---------- */
  if(fine && !reduce){
    var cursor = document.getElementById('cursor');
    var dot = document.getElementById('cursorDot');
    if(cursor && dot){
      document.body.classList.add('cursor-ready');
      var cx=innerWidth/2, cy=innerHeight/2, tx=cx, ty=cy, shown=false;
      window.addEventListener('mousemove', function(e){
        tx=e.clientX; ty=e.clientY;
        dot.style.transform='translate('+tx+'px,'+ty+'px) translate(-50%,-50%)';
        if(!shown){ cursor.style.opacity='1'; dot.style.opacity='1'; shown=true; }
      });
      (function loop(){ cx+=(tx-cx)*0.16; cy+=(ty-cy)*0.16; cursor.style.transform='translate('+cx+'px,'+cy+'px) translate(-50%,-50%)'; requestAnimationFrame(loop); })();
      document.querySelectorAll('a, button, [data-job], .chip, .cert, [data-cursor]').forEach(function(el){
        el.addEventListener('mouseenter', function(){ cursor.classList.add('is-hover'); if(el.closest('.contact')) cursor.classList.add('is-hover-dark'); });
        el.addEventListener('mouseleave', function(){ cursor.classList.remove('is-hover','is-hover-dark'); });
      });
    }
    // magnetic
    document.querySelectorAll('.magnetic').forEach(function(el){
      var s = 0.3;
      el.addEventListener('mousemove', function(e){
        var r = el.getBoundingClientRect();
        el.style.transform='translate('+((e.clientX-(r.left+r.width/2))*s)+'px,'+((e.clientY-(r.top+r.height/2))*s)+'px)';
      });
      el.addEventListener('mouseleave', function(){ el.style.transform=''; el.style.transition='transform .5s cubic-bezier(0.22,1,0.36,1)'; setTimeout(function(){ el.style.transition=''; }, 500); });
    });
    // tilt
    document.querySelectorAll('.cert, [data-tilt]').forEach(function(el){
      el.classList.add('tilt');
      el.addEventListener('mousemove', function(e){
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left)/r.width - 0.5, py = (e.clientY - r.top)/r.height - 0.5;
        el.style.transform = 'perspective(700px) rotateX('+(-py*6)+'deg) rotateY('+(px*6)+'deg) translateY(-5px)';
      });
      el.addEventListener('mouseleave', function(){ el.style.transform=''; });
    });
  }
})();
