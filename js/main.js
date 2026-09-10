/* Stan The Man Cleaning — site interactions */
(function () {
  "use strict";

  // Mobile nav toggle
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav__toggle");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // close on link click (mobile)
    header.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Services dropdown — click/tap/keyboard toggle (desktop also reveals on CSS hover)
  var submenuToggles = document.querySelectorAll(".nav__submenu-toggle");
  submenuToggles.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
    });
  });
  // Close any open submenu on outside click or Escape
  document.addEventListener("click", function (e) {
    submenuToggles.forEach(function (btn) {
      if (!btn.parentNode.contains(e.target)) btn.setAttribute("aria-expanded", "false");
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      submenuToggles.forEach(function (btn) { btn.setAttribute("aria-expanded", "false"); });
    }
  });

  // Header shadow on scroll
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // FAQ accordion (accessible)
  document.querySelectorAll(".faq__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      if (panel) {
        panel.style.maxHeight = expanded ? null : panel.scrollHeight + "px";
      }
    });
  });

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Before/after image sliders — a transparent range input drives the reveal
  // position (works with pointer, touch and keyboard); the visible handle follows.
  document.querySelectorAll(".ba-slider").forEach(function (slider) {
    var range = slider.querySelector(".ba-slider__range");
    if (!range) return;
    var setPos = function (v) { slider.style.setProperty("--pos", v + "%"); };
    setPos(range.value);
    range.addEventListener("input", function () { setPos(range.value); });
  });

  // Current year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Stat count-up (animates the number, preserving any prefix/suffix like + ★ %)
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function countUp(el) {
    var raw = el.textContent.trim();
    var m = raw.match(/^(\D*)(\d+)(.*)$/);
    if (!m) return;
    var pre = m[1], target = parseInt(m[2], 10), suf = m[3];
    if (reduceMotion) { return; }
    var start = null, dur = 1100;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var val = Math.floor((0.5 - Math.cos(Math.PI * p) / 2) * target); // ease-in-out
      el.textContent = pre + val + suf;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = pre + target + suf;
    }
    requestAnimationFrame(step);
  }
  var statWrap = document.querySelector(".stats");
  if (statWrap && "IntersectionObserver" in window) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          statWrap.querySelectorAll(".stat__num").forEach(countUp);
          sio.disconnect();
        }
      });
    }, { threshold: 0.4 });
    sio.observe(statWrap);
  }

  // Quote forms → GoHighLevel.
  // GHL's external-tracking.js syncs a lead by capturing the form's NATIVE submit
  // event, so we must not block or cancel it (no preventDefault, no AJAX takeover).
  // But a plain native submit navigates away immediately, which can abort GHL's
  // send before it completes. Fix: target each form at a hidden iframe. The native
  // submit still fires (GHL captures it) but the response loads into the iframe, so
  // the page stays put and GHL finishes sending; we then redirect to the thank-you
  // page ourselves. With JS off, the form still submits natively to /thank-you.
  document.querySelectorAll("form[data-quote-form]").forEach(function (form, i) {
    var sinkName = "stm-lead-sink-" + i;
    var sink = document.createElement("iframe");
    sink.name = sinkName;
    sink.hidden = true;
    sink.tabIndex = -1;
    sink.setAttribute("aria-hidden", "true");
    sink.title = "Form submission handler";
    document.body.appendChild(sink);
    form.setAttribute("target", sinkName);

    var sent = false;
    form.addEventListener("submit", function () {
      // Invalid required fields: let the browser show validation and cancel the submit.
      if (typeof form.checkValidity === "function" && !form.checkValidity()) return;
      if (sent) return; // guard against double submits
      sent = true;

      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      var msg = form.querySelector(".form-status");
      if (msg) {
        msg.hidden = false;
        msg.textContent = "Thanks! Sending your request…";
      }

      // The native submit into the hidden iframe has fired (GHL is capturing it).
      // Give the tracking request time to complete, then take the visitor onward.
      var dest = form.getAttribute("action") || "/thank-you";
      setTimeout(function () { window.location.href = dest; }, 1500);
    });
  });
})();
