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

  // Current year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Contact form — let GoHighLevel's tracking script capture the submit, then
  // redirect to the thank-you page with a clean URL (no PII in the query string).
  // No-JS fallback: the form's own method="GET" action="thank-you.html" still works.
  var form = document.querySelector("form[data-quote-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      // Let the browser show native validation for required fields.
      if (typeof form.checkValidity === "function" && !form.checkValidity()) {
        return; // do not prevent default — browser will display the validation UI
      }
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      var msg = form.querySelector(".form-status");
      if (msg) {
        msg.hidden = false;
        msg.textContent = "Thanks! Sending your request…";
      }
      // Small delay so GHL's own submit listener can capture the field values first.
      setTimeout(function () {
        window.location.href = form.getAttribute("action") || "thank-you.html";
      }, 300);
    });
  }
})();
