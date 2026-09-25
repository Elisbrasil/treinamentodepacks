document.addEventListener('DOMContentLoaded', function() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(function(el) { observer.observe(el); });
});

  // Carousel
  (function(){
    var track = document.getElementById('testiTrack');
    var dots = document.querySelectorAll('.carousel-dot');
    var prev = document.getElementById('testiPrev');
    var next = document.getElementById('testiNext');
    if(!track) return;
    var current = 0;
    var total = track.children.length;
    var autoTimer;

    function goTo(idx) {
      current = (idx + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function(d,i){ d.classList.toggle('active', i === current); });
    }

    function startAuto() { autoTimer = setInterval(function(){ goTo(current + 1); }, 4000); }
    function stopAuto() { clearInterval(autoTimer); }

    prev.addEventListener('click', function(){ stopAuto(); goTo(current - 1); startAuto(); });
    next.addEventListener('click', function(){ stopAuto(); goTo(current + 1); startAuto(); });
    dots.forEach(function(d){ d.addEventListener('click', function(){ stopAuto(); goTo(+d.dataset.index); startAuto(); }); });

    // Touch/swipe
    var startX = 0;
    track.addEventListener('touchstart', function(e){ startX = e.touches[0].clientX; stopAuto(); }, {passive:true});
    track.addEventListener('touchend', function(e){
      var diff = startX - e.changedTouches[0].clientX;
      if(Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
      startAuto();
    }, {passive:true});

    startAuto();
  })();