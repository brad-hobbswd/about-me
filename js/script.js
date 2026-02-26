document.addEventListener("DOMContentLoaded", () => {
  const yearNode = document.getElementById("year");
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());

  const revealNodes = Array.from(document.querySelectorAll(".reveal"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    revealNodes.forEach(node => node.classList.add("is-visible"));
  } else {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const visible = entry.isIntersecting;
        if (!visible) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealNodes.forEach(node => obs.observe(node));
  }

  const toggleBtn = document.querySelector(".nav-toggle");
  const menuNode = document.getElementById("navMenu");
  if (toggleBtn && menuNode) {
    toggleBtn.addEventListener("click", () => {
      const openNow = menuNode.classList.toggle("is-open");
      toggleBtn.setAttribute("aria-expanded", String(openNow));
    });
  }

  const prayerBtn = document.getElementById("prayerModeBtn");
  const storageKey = "bradPrayerMode";

  const setMode = (enabled) => {
    document.body.classList.toggle("prayer-mode", enabled);
    if (prayerBtn) prayerBtn.setAttribute("aria-pressed", String(enabled));
    try { localStorage.setItem(storageKey, enabled ? "on" : "off"); } catch (err) {}
  };

  let saved = "off";
  try { saved = localStorage.getItem(storageKey) || "off"; } catch (err) {}
  setMode(saved === "on");

  if (prayerBtn) {
    prayerBtn.addEventListener("click", () => {
      const enabled = !document.body.classList.contains("prayer-mode");
      setMode(enabled);
    });
  }

  const formNode = document.getElementById("contactForm");
  if (formNode) {
    formNode.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameVal = String(document.getElementById("name").value || "").trim();
      const emailVal = String(document.getElementById("email").value || "").trim();
      const topicVal = String(document.getElementById("topic").value || "").trim();
      const messageVal = String(document.getElementById("message").value || "").trim();

      const toAddress = "brad.hobbs13@icloud.com";

      const subjectLine = `Website contact: ${topicVal} from ${nameVal}`;
      const bodyLines = [
        `Name: ${nameVal}`,
        `Email: ${emailVal}`,
        `Topic: ${topicVal}`,
        "",
        "Message:",
        messageVal
      ];

      const mailtoUrl =
        `mailto:${encodeURIComponent(toAddress)}` +
        `?subject=${encodeURIComponent(subjectLine)}` +
        `&body=${encodeURIComponent(bodyLines.join("\\n"))}`;

      window.location.href = mailtoUrl;

      window.setTimeout(() => {
        window.location.href = "thank-you.html";
      }, 650);
    });
  }
});
(async function siteHealthCheck(){
  const params = new URLSearchParams(window.location.search);
  const showHealth = params.get("health") === "1";
  const panel = document.getElementById("siteHealth");

  if (!panel) return;
  if (!showHealth) return;

  panel.hidden = false;

  const setStatus = (key, text, cls) => {
    const node = panel.querySelector(`[data-check="${key}"]`);
    if (!node) return;
    node.textContent = text;
    node.classList.remove("health-ok", "health-bad", "health-warn");
    node.classList.add(cls);
  };

  const probe = async (path) => {
    try{
      const res = await fetch(path, { cache: "no-store" });
      return res.ok;
    }catch(e){
      return false;
    }
  };

  const cssOk = await probe("css/styles.css");
  setStatus("css", cssOk ? "OK" : "Missing", cssOk ? "health-ok" : "health-bad");

  const jsOk = await probe("js/script.js");
  setStatus("js", jsOk ? "OK" : "Missing", jsOk ? "health-ok" : "health-bad");

  const logoOk = await probe("assets/logos/brad-hobbs-web-design.png");
setStatus("logos", logoOk ? "OK" : "Missing file", logoOk ? "health-ok" : "health-bad");

const dataOk = await probe("data/discography.json");
setStatus("data", dataOk ? "OK" : "Missing file", dataOk ? "health-ok" : "health-bad");
})();
