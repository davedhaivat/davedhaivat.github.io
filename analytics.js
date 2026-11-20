/* GA4 event tracking (property G-QF8JS03SJG). One delegated listener, no per-link code needed. */
(function () {
  function send(name, params) {
    try { if (window.gtag) gtag('event', name, Object.assign({ page_path: location.pathname }, params || {})); } catch (e) {}
  }
  function label(a) { return (a.getAttribute('aria-label') || a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80); }
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a') : null;
    if (a) {
      var href = a.getAttribute('href') || '';
      var where = a.closest('nav') ? 'nav' : a.closest('footer') ? 'footer' : a.closest('.hero,.hero2,.ph') ? 'hero' : 'body';
      if (href.indexOf('mailto:') === 0) { send('email_click', { link_location: where }); send('generate_lead', { method: 'email_link' }); }
      else if (href.indexOf('linkedin.com/pulse/') > -1) send('article_click', { article: href.split('/pulse/')[1].replace(/\/$/, ''), link_location: where });
      else if (href.indexOf('recent-activity/articles') > -1) send('all_articles_click', { link_location: where });
      else if (href.indexOf('linkedin.com') > -1) send('linkedin_click', { link_location: where, link_text: label(a) });
      else if (href.indexOf('github.com') > -1) send('github_click', { link_location: where });
      else if (/^https?:/.test(href) && href.indexOf(location.host) < 0) send('outbound_click', { link_url: href.slice(0, 100) });
      else if (/\.pdf($|\?)/i.test(href)) send('file_download', { link_url: href });
      else if (a.classList.contains('btn') || a.classList.contains('tile-foot')) send('cta_click', { link_text: label(a), link_location: where });
      return;
    }
    var b = e.target.closest ? e.target.closest('button') : null;
    if (b && b.classList.contains('theme-toggle')) send('theme_toggle', {});
    else if (b && /filter|fbtn|chip/i.test(b.className) && b.textContent) send('project_filter', { filter: b.textContent.trim().slice(0, 30) });
  }, true);
  document.addEventListener('submit', function (e) {
    if (e.target && e.target.id === 'contactForm') { send('contact_form_submit', {}); send('generate_lead', { method: 'contact_form' }); }
  }, true);
  /* reached the end of a page: finer than GA's default 90% scroll */
  var seen = {};
  window.addEventListener('scroll', function () {
    var h = document.documentElement, p = Math.round((h.scrollTop + innerHeight) / h.scrollHeight * 100);
    [50, 90].forEach(function (t) { if (p >= t && !seen[t]) { seen[t] = 1; send('scroll_depth', { percent: t }); } });
  }, { passive: true });
})();
