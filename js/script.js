/* MOTIvision Holdings — site script
   Handles: mobile navigation, FAQ accordion, contact form validation. */

(function () {
  "use strict";

  /* ---------------- Mobile navigation ---------------- */
  var hamburger = document.querySelector(".hamburger");
  var mobileNav = document.querySelector(".mobile-nav");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
        mobileNav.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.focus();
      }
    });
  }

  /* ---------------- Mobile quick actions ---------------- */
  if (!document.querySelector(".mobile-bottom-nav")) {
    document.body.insertAdjacentHTML("beforeend", `
      <nav class="mobile-bottom-nav" aria-label="Mobile quick actions">
        <a href="index.html#home-hero">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/></svg>
          <span>Home</span>
        </a>
        <a href="services.html#services">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>
          <span>Services</span>
        </a>
        <a class="mobile-bottom-whatsapp" href="https://wa.me/27647845167" aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.1 8.1 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8.9-.2.2-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5l-.7-1.8c-.2-.4-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.6 1.1 2.8.1.2 2 3 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3Z"/></svg>
          <span>WhatsApp</span>
        </a>
        <a href="tel:+27647845167" aria-label="Call MOTIvision">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z"/></svg>
          <span>Call</span>
        </a>
        <a class="mobile-bottom-quote" href="contact.html#enquiry-form">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3h10l4 4v14H5z"/><path d="M15 3v5h4M8 13h8M8 17h5"/></svg>
          <span>Quote</span>
        </a>
      </nav>
    `);
  }

  /* ---------------- FAQ accordion ---------------- */
  var faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");

      /* Close all other items (single-open accordion) */
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove("is-open");
          other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          other.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("is-open");
        question.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("is-open");
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* ---------------- Contact form validation ---------------- */
  var form = document.getElementById("enquiry-form");

  if (form) {
    var statusBox = document.getElementById("form-status");

    var validators = {
      "full-name": function (v) { return v.trim().length > 1; },
      "phone": function (v) { return v.trim().length >= 7; },
      "email": function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
      "service": function (v) { return v.trim().length > 0; },
      "message": function (v) { return v.trim().length > 4; }
    };

    function validateField(field) {
      var id = field.id;
      var validator = validators[id];
      if (!validator) return true;

      var wrapper = field.closest(".field");
      var valid = validator(field.value);

      if (wrapper) {
        wrapper.classList.toggle("has-error", !valid);
      }
      return valid;
    }

    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      field.addEventListener("blur", function () { validateField(field); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var fields = form.querySelectorAll("input, select, textarea");
      var allValid = true;

      fields.forEach(function (field) {
        if (validators[field.id] && !validateField(field)) {
          allValid = false;
        }
      });

      if (!allValid) {
        if (statusBox) {
          statusBox.textContent = "Please check the highlighted fields and try again.";
          statusBox.style.background = "#FBEAE6";
          statusBox.style.borderLeftColor = "#A3402F";
          statusBox.classList.add("is-visible");
        }
        return;
      }

      /* No backend is connected yet. Do not claim the enquiry was sent or
         stored — direct the visitor to WhatsApp, phone or email instead. */
      if (statusBox) {
        statusBox.textContent = "This form isn't connected to email yet. Please send your enquiry via WhatsApp, phone or email using the details on this page, and we'll get back to you.";
        statusBox.style.background = "";
        statusBox.style.borderLeftColor = "";
        statusBox.classList.add("is-visible");
      }
    });
  }
})();
