// Setonix Technologies — site behavior.
// Vanilla JS (no libraries): hero load-in fade, scroll reveal, smooth-scroll
// nav, sticky-header style, mobile menu toggle, and the contact form (Formspree
// with a mailto fallback). Wired on DOMContentLoaded. The <script> is deferred,
// so the DOM is ready, but we wire explicitly for safety.
(function () {
  "use strict";

  // ----------------------------------------------------------------------
  // Contact form endpoint.
  //
  // To receive form submissions by email, create a free form at
  // https://formspree.io, then replace XXXXXXX below with your form's id
  // (the final path segment of its endpoint URL).
  //
  // Until XXXXXXX is replaced, the contact form falls back to opening a
  // prefilled mailto:info@setonixtech.com message in the visitor's mail client.
  // ----------------------------------------------------------------------
  var FORMSPREE_ENDPOINT = "https://formspree.io/f/XXXXXXX";

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  // ----------------------------------------------------------------------
  // (a) Hero load-in fade — toggles `.is-loaded` on <body>; input.css keys the
  //     `.hero-fade` transition off `body.is-loaded`.
  // ----------------------------------------------------------------------
  function initHeroFade(reduced) {
    if (reduced) {
      // Show immediately, no reliance on a transition.
      document.body.classList.add("is-loaded");
      return;
    }
    // Double rAF so the initial (hidden) state paints before the class flips,
    // guaranteeing the transition runs.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.classList.add("is-loaded");
      });
    });
  }

  // ----------------------------------------------------------------------
  // (b) Scroll reveal — IntersectionObserver over [data-reveal]; reveal once.
  // ----------------------------------------------------------------------
  function initScrollReveal(reduced) {
    var revealEls = document.querySelectorAll("[data-reveal]");
    if (!revealEls.length) return;

    if (reduced || !("IntersectionObserver" in window)) {
      // Mark everything visible immediately; no observer.
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var delay = parseInt(el.getAttribute("data-reveal-delay"), 10);
          if (!isNaN(delay)) {
            el.style.transitionDelay = delay + "ms";
          }
          el.classList.add("is-visible");
          obs.unobserve(el); // reveal once — never re-hide on scroll up
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ----------------------------------------------------------------------
  // (c) Smooth-scroll nav — intercept header/footer anchors to in-page ids and
  //     scroll with the fixed-header offset (via CSS scroll-margin-top).
  // ----------------------------------------------------------------------
  function initSmoothScroll(reduced) {
    var containers = document.querySelectorAll("header, footer");
    containers.forEach(function (container) {
      container.addEventListener("click", function (event) {
        var link = event.target.closest('a[href^="#"]');
        if (!link || !container.contains(link)) return;

        var href = link.getAttribute("href");
        if (!href || href === "#") return; // treat bare "#" as a no-op anchor

        var target = document.getElementById(href.slice(1));
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });

        // Keep the URL hash in sync without an extra jump.
        if (history.replaceState) {
          history.replaceState(null, "", href);
        }
      });
    });
  }

  // ----------------------------------------------------------------------
  // (d) Sticky header style — add `.scrolled` once the page scrolls a little.
  // ----------------------------------------------------------------------
  function initStickyHeader() {
    var header = document.querySelector("header");
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 8) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set initial state (e.g. when loaded mid-page)
  }

  // ----------------------------------------------------------------------
  // (e) Mobile menu — hamburger toggles the panel and aria-expanded; close on
  //     link click or when resizing up to desktop.
  // ----------------------------------------------------------------------
  function initMobileMenu() {
    var toggle = document.getElementById("menu-toggle");
    var menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;

    function openMenu() {
      menu.hidden = false;
      menu.classList.remove("hidden");
      toggle.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
      menu.hidden = true;
      menu.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Clicking any link inside the panel closes it.
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    // Resizing up to desktop (Tailwind `md` = 768px) closes the menu.
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    });
  }

  // ----------------------------------------------------------------------
  // Task 13 — Contact form: client validation + Formspree / mailto fallback.
  // ----------------------------------------------------------------------
  function initContactForm() {
    var contact = document.getElementById("contact");
    if (!contact) return;
    var form = contact.querySelector("form");
    if (!form) return;

    var nameField = form.querySelector("#name");
    var emailField = form.querySelector("#email");
    var messageField = form.querySelector("#message");
    var submitBtn = form.querySelector('[type="submit"]');

    // A single status region for success / error messages.
    var status = document.createElement("p");
    status.className = "form-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    form.appendChild(status);

    function errorFor(field) {
      var id = field.id + "-error";
      var el = document.getElementById(id);
      if (!el) {
        el = document.createElement("p");
        el.id = id;
        el.className = "form-error";
        field.insertAdjacentElement("afterend", el);
      }
      return el;
    }

    function setError(field, message) {
      var el = errorFor(field);
      el.textContent = message;
      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedby", el.id);
    }

    function clearError(field) {
      var el = document.getElementById(field.id + "-error");
      if (el) el.textContent = "";
      field.removeAttribute("aria-invalid");
      field.removeAttribute("aria-describedby");
    }

    function setStatus(message, kind) {
      status.textContent = message;
      status.classList.remove("is-success", "is-error");
      if (kind) status.classList.add("is-" + kind);
    }

    function validate() {
      var valid = true;

      if (!nameField.value.trim()) {
        setError(nameField, "Please enter your name.");
        valid = false;
      } else {
        clearError(nameField);
      }

      if (!EMAIL_RE.test(emailField.value.trim())) {
        setError(emailField, "Please enter a valid email address.");
        valid = false;
      } else {
        clearError(emailField);
      }

      if (!messageField.value.trim()) {
        setError(messageField, "Please enter a message.");
        valid = false;
      } else {
        clearError(messageField);
      }

      return valid;
    }

    function openMailto() {
      var subject = "Partnership enquiry from " + nameField.value.trim();
      var body =
        "Name: " +
        nameField.value.trim() +
        "\nEmail: " +
        emailField.value.trim() +
        "\n\n" +
        messageField.value.trim();
      var href =
        "mailto:info@setonixtech.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
      window.location.href = href;
      setStatus(
        "Opening your email app to send the message to info@setonixtech.com.",
        "success"
      );
    }

    function submitToFormspree() {
      submitBtn.disabled = true;
      setStatus("Sending your message…", null);

      fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then(function (res) {
          if (res.ok) {
            setStatus(
              "Thanks for reaching out — your message has been sent.",
              "success"
            );
            form.reset();
          } else {
            setStatus(
              "Something went wrong sending your message. Please try again.",
              "error"
            );
          }
        })
        .catch(function () {
          setStatus(
            "Network error — your message could not be sent. Please try again.",
            "error"
          );
        })
        .finally(function () {
          submitBtn.disabled = false;
        });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!validate()) {
        setStatus("", null);
        return;
      }

      if (FORMSPREE_ENDPOINT.indexOf("XXXXXXX") !== -1) {
        openMailto();
      } else {
        submitToFormspree();
      }
    });
  }

  // ----------------------------------------------------------------------
  // Wire everything on DOM ready.
  // ----------------------------------------------------------------------
  function init() {
    var reduced = prefersReducedMotion();
    initHeroFade(reduced);
    initScrollReveal(reduced);
    initSmoothScroll(reduced);
    initStickyHeader();
    initMobileMenu();
    initContactForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
