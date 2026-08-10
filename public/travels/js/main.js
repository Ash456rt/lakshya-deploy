/* =========================================================
   Lakshya Groups Travels — main.js
   Mobile nav, sticky header, counters, reveal, gallery, forms
   ========================================================= */
(function () {
  "use strict";

  // WhatsApp business number (international format, no + or spaces)
  var WA_NUMBER = "919902841875";

  document.addEventListener("DOMContentLoaded", function () {

    /* ---------- Current year ---------- */
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Hero background video ---------- */
    var heroVideo = document.querySelector(".hero__video");
    if (heroVideo) {
      // Some mobile browsers need an explicit play() call after load.
      var tryPlay = heroVideo.play();
      if (tryPlay && typeof tryPlay.catch === "function") {
        tryPlay.catch(function () { /* autoplay blocked — poster image shows instead */ });
      }
      // Respect users who prefer reduced motion.
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        heroVideo.pause();
        heroVideo.removeAttribute("autoplay");
      }
    }

    /* ---------- Mobile navigation ---------- */
    var nav = document.getElementById("nav");
    var toggle = document.getElementById("navToggle");
    var closeBtn = document.getElementById("navClose");

    function openNav() {
      nav.classList.add("is-open");
      document.body.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
    }
    function closeNav() {
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    if (toggle) toggle.addEventListener("click", function () {
      nav.classList.contains("is-open") ? closeNav() : openNav();
    });
    if (closeBtn) closeBtn.addEventListener("click", closeNav);

    // Close menu when a link is tapped
    nav.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    /* ---------- Sticky header shadow ---------- */
    var header = document.getElementById("header");
    function onScroll() {
      if (window.scrollY > 12) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---------- Animated stat counters ---------- */
    var counters = document.querySelectorAll(".stat__num");
    var countersDone = false;

    function formatNumber(n) {
      return n.toLocaleString("en-IN");
    }
    function runCounters() {
      if (countersDone) return;
      countersDone = true;
      counters.forEach(function (el) {
        var target = parseInt(el.getAttribute("data-count"), 10) || 0;
        var duration = 1600;
        var startTime = null;
        function step(ts) {
          if (!startTime) startTime = ts;
          var progress = Math.min((ts - startTime) / duration, 1);
          // ease-out
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = formatNumber(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = formatNumber(target);
        }
        requestAnimationFrame(step);
      });
    }

    /* ---------- IntersectionObserver: reveal + counters ---------- */
    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(".reveal").forEach(function (el) {
        revealObserver.observe(el);
      });

      var statsSection = document.querySelector(".stats");
      if (statsSection) {
        var statObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              runCounters();
              statObserver.disconnect();
            }
          });
        }, { threshold: 0.4 });
        statObserver.observe(statsSection);
      }
    } else {
      // Fallback
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
      runCounters();
    }

    /* ---------- Gallery lightbox ---------- */
    var lightbox = document.getElementById("lightbox");
    var lightboxImg = document.getElementById("lightboxImg");
    var lightboxClose = document.getElementById("lightboxClose");

    function openLightbox(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || "";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      lightboxImg.src = "";
    }

    document.querySelectorAll(".gallery-item").forEach(function (item) {
      item.addEventListener("click", function () {
        var full = item.getAttribute("data-full");
        var img = item.querySelector("img");
        openLightbox(full, img ? img.alt : "");
      });
    });
    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightbox) lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
    });

    /* ---------- Package tabs (National / International) ---------- */
    var pkgTabs = document.querySelectorAll(".pkg-tab");
    if (pkgTabs.length) {
      pkgTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          var targetId = tab.getAttribute("data-target");

          // Toggle button states
          pkgTabs.forEach(function (t) {
            var active = t === tab;
            t.classList.toggle("is-active", active);
            t.setAttribute("aria-selected", active ? "true" : "false");
          });

          // Toggle panels
          document.querySelectorAll(".pkg-panel").forEach(function (panel) {
            var show = panel.id === targetId;
            panel.hidden = !show;
            // Reveal cards inside the now-visible panel (they were display:none for the observer)
            if (show) {
              panel.querySelectorAll(".reveal").forEach(function (el) {
                el.classList.add("is-visible");
              });
            }
          });
        });
      });
    }

    /* ---------- Quick enquiry (hero) ---------- */
    var quickForm = document.getElementById("quickEnquiry");
    if (quickForm) {
      quickForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var dest = document.getElementById("qeDestination");
        if (!dest.value) {
          dest.focus();
          dest.style.borderColor = "#d64545";
          return;
        }
        // Prefill the main contact form and scroll to it
        var cfDest = document.getElementById("cfDest");
        var cfDate = document.getElementById("cfDate");
        if (cfDest) cfDest.value = dest.value;
        if (cfDate && document.getElementById("qeDate").value) {
          cfDate.value = document.getElementById("qeDate").value;
        }
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
      });
    }

    /* ---------- Contact form validation ---------- */
    var contactForm = document.getElementById("contactForm");
    var formStatus = document.getElementById("formStatus");

    function setError(input, message) {
      var field = input.closest(".field");
      var errEl = field ? field.querySelector(".field__error") : null;
      if (message) {
        field.classList.add("is-invalid");
        if (errEl) errEl.textContent = message;
      } else {
        field.classList.remove("is-invalid");
        if (errEl) errEl.textContent = "";
      }
    }

    function validEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }
    function validPhone(v) {
      return /^[+]?[\d\s\-()]{7,}$/.test(v);
    }

    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = document.getElementById("cfName");
        var email = document.getElementById("cfEmail");
        var phone = document.getElementById("cfPhone");
        var ok = true;

        if (!name.value.trim()) { setError(name, "Please enter your name."); ok = false; }
        else setError(name, "");

        if (!email.value.trim()) { setError(email, "Please enter your email."); ok = false; }
        else if (!validEmail(email.value)) { setError(email, "Enter a valid email address."); ok = false; }
        else setError(email, "");

        if (!phone.value.trim()) { setError(phone, "Please enter your phone."); ok = false; }
        else if (!validPhone(phone.value)) { setError(phone, "Enter a valid phone number."); ok = false; }
        else setError(phone, "");

        if (!ok) {
          formStatus.textContent = "Please fix the highlighted fields.";
          formStatus.classList.remove("is-success");
          return;
        }

        // Build a WhatsApp message and open a chat to the business number.
        var dest = document.getElementById("cfDest").value;
        var date = document.getElementById("cfDate").value;
        var msg = document.getElementById("cfMsg").value;

        var lines = [
          "*New Enquiry — Lakshya Groups Travels*",
          "",
          "Name: " + name.value.trim(),
          "Phone: " + phone.value.trim(),
          "Email: " + email.value.trim(),
          "Destination: " + (dest || "Not specified"),
          "Preferred date: " + (date || "Flexible"),
          "Message: " + (msg.trim() || "-")
        ];
        var waURL = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));

        window.open(waURL, "_blank");

        formStatus.textContent = "Opening WhatsApp… please tap Send there to confirm your enquiry.";
        formStatus.classList.add("is-success");
      });
    }
  });
})();
