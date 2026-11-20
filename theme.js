/* Theme toggle + scroll reveal. The tiny inline <head> script sets data-theme before paint (no flash). */
(function () {
  var root = document.documentElement;
  var KEY = 'dd-theme';
  function current() { return root.getAttribute('data-theme') || 'dark'; }
  function apply(t, save) {
    root.setAttribute('data-theme', t);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', t === 'light' ? '#f5f2ea' : '#090b0e');
    var b = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < b.length; i++) {
      b[i].setAttribute('aria-label', 'Switch to ' + (t === 'light' ? 'dark' : 'light') + ' theme');
      b[i].setAttribute('aria-pressed', t === 'light' ? 'true' : 'false');
    }
    if (save) { try { localStorage.setItem(KEY, t); } catch (e) {} }
  }
  document.addEventListener('DOMContentLoaded', function () {
    apply(current(), false);
    var btns = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () { apply(current() === 'light' ? 'dark' : 'light', true); });
    }
    // follow the OS setting only until the visitor makes their own choice
    try {
      var saved = localStorage.getItem(KEY);
      if (!saved && window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
          if (!localStorage.getItem(KEY)) apply(e.matches ? 'light' : 'dark', false);
        });
      }
    } catch (e) {}
    // scroll reveal
    var els = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && els.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      els.forEach(function (el) { io.observe(el); });
    } else { els.forEach(function (el) { el.classList.add('in'); }); }
  });
})();
