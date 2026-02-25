document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    revealEls.forEach(el => el.classList.add("is-visible"));
  } else {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => obs.observe(el));
  }

  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const openNow = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(openNow));
    });
  }

  const prayerBtn = document.getElementById("prayerModeBtn");
  const storageKey = "bradPrayerMode";

  const setMode = (enabled) => {
    document.body.classList.toggle("prayer-mode", enabled);
    if (prayerBtn) prayerBtn.setAttribute("aria-pressed", String(enabled));
    try { localStorage.setItem(storageKey, enabled ? "on" : "off"); } catch (e) {}
  };

  let saved = "off";
  try { saved = localStorage.getItem(storageKey) || "off"; } catch (e) {}
  setMode(saved === "on");

  if (prayerBtn) {
    prayerBtn.addEventListener("click", () => {
      const enabled = !document.body.classList.contains("prayer-mode");
      setMode(enabled);
    });
  }
});