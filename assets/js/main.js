/* remotesalesforce.asia – main.js
   Version 0.4 – 2026-06-30 – Bodo Kopplin */
(function () {
  "use strict";

  // Mobile-Navigation Toggle
  var toggle = document.querySelector(".nav-toggle");
  var links  = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", links.classList.contains("open") ? "true" : "false");
    });
  }

  // Aktuelles Jahr im Footer
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Dropdown per URL-Parameter vorauswählen (?service=resumee-check etc.)
  var serviceSelect = document.querySelector("#service");
  if (serviceSelect) {
    var serviceMap = {
      "resumee-check":   "Resümee-Check (25 USD)",
      "resumee-writing": "Resümee-Writing (50 USD)",
      "coaching":        "Bewerber-Coaching (50 USD / 45 Min)",
      "bewerbung":       "Bewerbung B2B-Vertrieb"
    };
    var urlParam = new URLSearchParams(window.location.search).get("service");
    if (urlParam && serviceMap[urlParam]) {
      serviceSelect.value = serviceMap[urlParam];
    }
  }

  // Kontaktformular → mailto
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status  = form.querySelector(".form-status");
      var name     = form.querySelector("#name").value.trim();
      var email    = form.querySelector("#email").value.trim();
      var service  = form.querySelector("#service").value;
      var nachricht= form.querySelector("#nachricht").value.trim();
      var consent  = form.querySelector("[name=consent]").checked;

      if (!name || !email || !nachricht || !consent) {
        status.textContent = "Bitte alle Pflichtfelder ausfüllen.";
        status.style.color = "#e11d48";
        return;
      }

      var subject = encodeURIComponent("Anfrage: " + service + " – " + name);
      var body    = encodeURIComponent(
        "Name: " + name + "\n" +
        "E-Mail: " + email + "\n" +
        "Anliegen: " + service + "\n\n" +
        nachricht
      );

      window.location.href = "mailto:bodo@remotesalesforce.asia?subject=" + subject + "&body=" + body;
    });
  }

})();
