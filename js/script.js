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
