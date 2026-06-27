/* remotesalesforce.asia – main.js
   Version 0.1 – 2026-06-27 – Bodo Kopplin */
(function () {
  "use strict";

  // Mobile-Navigation Toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      var open = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Aktuelles Jahr im Footer
  var y = document.querySelectorAll("[data-year]");
  y.forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* -----------------------------------------------------------------
     Kontaktformular – Platzhalter.
     Spaeter: Supabase-Anbindung. Beispiel (NICHT aktiv, Secrets via .env
     bzw. Build-Env, niemals hardcoden):

       import { createClient } from "@supabase/supabase-js";
       const supabase = createClient("<YOUR_SUPABASE_URL>", "<YOUR_SUPABASE_ANON_KEY>");
       const { error } = await supabase.from("kontaktanfragen").insert({
         name, email, nachricht
       });

     Aktuell wird das Formular abgefangen und zeigt nur einen Hinweis.
  ------------------------------------------------------------------ */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      if (status) {
        status.textContent =
          "Danke! Das Formular ist noch nicht aktiv. Bitte schreib mir vorerst direkt an bodo@remotesalesforce.asia.";
        status.style.color = "var(--brand-dark)";
      }
    });
  }
})();
