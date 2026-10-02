/* Jalan Jalan Travel — main.js */
(function () {
  // ---------- Hamburger menu ----------
  var body = document.body;
  var burger = document.getElementById('burger');
  var closeBtn = document.getElementById('drawer-close');
  var bg = document.getElementById('drawer-bg');

  function openMenu() {
    body.classList.add('menu-open');
    burger.setAttribute('aria-expanded', 'true');
    closeBtn.focus();
  }
  function closeMenu() {
    body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
  }
  if (burger) burger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (bg) bg.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) { closeMenu(); burger.focus(); }
  });
  document.querySelectorAll('#drawer a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  // ---------- Package filter (pakej.html) ----------
  var grid = document.getElementById('pkgrid');
  if (grid) {
    var tabs = document.querySelectorAll('.tab');
    var empty = document.getElementById('empty');
    function applyFilter(f) {
      var shown = 0;
      tabs.forEach(function (t) {
        var on = t.dataset.f === f;
        t.classList.toggle('on', on);
        t.setAttribute('aria-selected', on);
      });
      grid.querySelectorAll('.card').forEach(function (c) {
        var ok = f === 'all' || c.dataset.c.split(' ').indexOf(f) > -1;
        c.hidden = !ok;
        if (ok) shown++;
      });
      if (empty) empty.style.display = shown ? 'none' : 'block';
    }
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        applyFilter(t.dataset.f);
        history.replaceState(null, '', t.dataset.f === 'all' ? 'pakej.html' : 'pakej.html?f=' + t.dataset.f);
      });
    });
    // Links from the hamburger menu: pakej.html?f=group etc.
    function fromUrl() {
      var f = new URLSearchParams(location.search).get('f') || 'all';
      var valid = Array.prototype.some.call(tabs, function (t) { return t.dataset.f === f; });
      applyFilter(valid ? f : 'all');
    }
    fromUrl();
    window.addEventListener('popstate', fromUrl);
    // Same-page menu links (already on pakej.html)
    document.querySelectorAll('a[data-filter]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        applyFilter(a.dataset.filter);
        history.replaceState(null, '', a.getAttribute('href'));
        document.getElementById('senarai').scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  // ---------- Detail page tabs ----------
  var dtabs = document.querySelectorAll('.dtabs a');
  if (dtabs.length) {
    dtabs.forEach(function (a) {
      a.addEventListener('click', function () {
        dtabs.forEach(function (x) { x.classList.toggle('on', x === a); });
      });
    });
  }
})();
