/* remotesalesforce.asia – main.js
   Version 0.2 – 2026-06-29 – Bodo Kopplin
   Supabase-Anbindung: remotesalesforce_kontakt */
(function () {
  "use strict";

  // ── Supabase-Konfiguration ──────────────────────────────────────────────
  var SUPABASE_URL  = "https://jvujmlssgnqawqqaeqnb.supabase.co";
  var SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2dWptbHNzZ25xYXdxcWFlcW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MzQwMzcsImV4cCI6MjA5NTUxMDAzN30.H604HEyX8ezyP41JMxT6JcZ1J4wlNBmo_u2LIT5KPiI";

  // ── Mobile-Navigation Toggle ────────────────────────────────────────────
  var toggle = document.querySelector(".nav-toggle");
  var links  = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", links.classList.contains("open") ? "true" : "false");
    });
  }

  // ── Aktuelles Jahr im Footer ────────────────────────────────────────────
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ── Kontaktformular → Supabase ──────────────────────────────────────────
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      var btn    = form.querySelector("[type=submit]");
      var status = form.querySelector(".form-status");

      var name      = form.querySelector("#name").value.trim();
      var email     = form.querySelector("#email").value.trim();
      var service   = form.querySelector("#service").value;
      var nachricht = form.querySelector("#nachricht").value.trim();
      var consent   = form.querySelector("[name=consent]").checked;

      if (!name || !email || !nachricht || !consent) {
        status.textContent = "Bitte alle Pflichtfelder ausfüllen.";
        status.style.color = "#e11d48";
        return;
      }

      btn.disabled    = true;
      btn.textContent = "Wird gesendet…";
      status.textContent = "";

      try {
        var res = await fetch(SUPABASE_URL + "/rest/v1/remotesalesforce_kontakt", {
          method : "POST",
          headers: {
            "Content-Type" : "application/json",
            "apikey"       : SUPABASE_ANON,
            "Authorization": "Bearer " + SUPABASE_ANON,
            "Prefer"       : "return=minimal"
          },
          body: JSON.stringify({ name, email, service, nachricht, consent })
        });

        if (!res.ok) throw new Error("HTTP " + res.status);

        status.textContent = "✓ Danke! Ich melde mich persönlich bei dir.";
        status.style.color = "var(--brand-dark, #0d9488)";
        form.reset();

      } catch (err) {
        status.textContent = "Fehler beim Senden. Bitte schreib mir direkt: bodo@remotesalesforce.asia";
        status.style.color = "#e11d48";
        console.error(err);

      } finally {
        btn.disabled    = false;
        btn.textContent = "Nachricht senden";
      }
    });
  }

})();
