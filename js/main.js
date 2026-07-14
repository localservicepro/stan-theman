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

  // Contact form — graceful no-backend handling
  var form = document.querySelector("form[data-quote-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      // If action is still the placeholder, prevent submit and show guidance.
      if (form.getAttribute("action") === "#" || form.dataset.demo === "true") {
        e.preventDefault();
        var msg = form.querySelector(".form-status");
        if (msg) {
          msg.hidden = false;
          msg.textContent = "Thanks! This demo form isn't connected yet — please call 0411 188 458 or email info@stanthemancleaning.com.au and we'll get straight back to you.";
          msg.focus();
        }
      }
    });
  }
})();
