/* ============================================================
   EYKOTECH — small behaviour layer (vanilla JS, no dependencies)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- header state on scroll ---------- */
  var header = document.getElementById("siteHeader");
  var toTop = document.getElementById("toTop");
  function onScroll() {
    var y = window.scrollY || 0;
    if (header) header.classList.toggle("scrolled", y > 8);
    if (toTop) toTop.classList.toggle("show", y > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- mobile nav ---------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    mainNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
    /* open dropdowns on tap in the mobile drawer */
    mainNav.querySelectorAll(".main-nav__list > li.has-drop > a").forEach(function (a) {
      a.addEventListener("click", function (e) {
        if (window.matchMedia("(max-width: 940px)").matches) {
          e.preventDefault();
          a.closest("li").classList.toggle("open");
        }
      });
    });
  }

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          ro.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- count-up stats ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1100;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      el.textContent = val.toLocaleString("en-US") + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length && "IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { co.observe(c); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- testimonial track ---------- */
  var track = document.getElementById("track");
  if (track) {
    var row = track.querySelector(".track__row");
    var slides = row.children.length;
    var idx = 0;
    var timer = null;

    function go(n) {
      idx = (n + slides) % slides;
      row.style.transform = "translateX(-" + idx * 100 + "%)";
      track.querySelectorAll(".dot").forEach(function (d, i) {
        d.classList.toggle("active", i === idx);
      });
    }
    track.querySelectorAll(".dots").forEach(function () {});
    var dotsBox = track.querySelector(".dots");
    if (dotsBox) {
      dotsBox.querySelectorAll(".dot").forEach(function (d, i) {
        d.addEventListener("click", function () { go(i); restart(); });
      });
    }
    var prev = track.querySelector("[data-slide='prev']");
    var next = track.querySelector("[data-slide='next']");
    if (prev) prev.addEventListener("click", function () { go(idx - 1); restart(); });
    if (next) next.addEventListener("click", function () { go(idx + 1); restart(); });

    function restart() {
      if (timer) clearInterval(timer);
      if (slides > 1) timer = setInterval(function () { go(idx + 1); }, 6500);
    }
    restart();
  }

  /* ---------- product grid filter + search ---------- */
  var chips = document.querySelectorAll(".chip[data-filter]");
  var searchBox = document.getElementById("productSearch");
  var cards = document.querySelectorAll(".product-card[data-cat]");
  var countEl = document.getElementById("resultCount");
  var noneEl = document.getElementById("noResults");

  function applyFilter() {
    var active = (document.querySelector(".chip.active") || {}).getAttribute && document.querySelector(".chip.active").getAttribute("data-filter");
    if (active === undefined) active = "all";
    var q = (searchBox ? searchBox.value : "").trim().toLowerCase();
    var shown = 0;
    cards.forEach(function (c) {
      var cat = c.getAttribute("data-cat") || "all";
      var name = c.getAttribute("data-name") || "";
      var okCat = active === "all" || cat === active;
      var okQ = !q || name.indexOf(q) !== -1;
      var vis = okCat && okQ;
      c.style.display = vis ? "" : "none";
      if (vis) shown++;
    });
    if (countEl) countEl.textContent = shown + (shown === 1 ? " item" : " items");
    if (noneEl) noneEl.style.display = shown === 0 ? "" : "none";
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("active"); });
      chip.classList.add("active");
      applyFilter();
    });
  });
  if (searchBox) searchBox.addEventListener("input", applyFilter);

  /* ---------- forms (preview only, no backend) ---------- */
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector(".form-note");
      if (note) {
        note.textContent = "Thanks — your message has been noted. This demo site doesn't send email yet, so drop us a line at info@eykotech.com.";
        note.classList.add("show");
      }
    });
  });

  /* ---------- footer year ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();