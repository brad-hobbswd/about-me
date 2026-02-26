(function(){
  const K_PRAYER = "prayerMode";
  const K_FOCUS = "focusMode";
  const K_MENU = "menuOpen";

  function safeGet(k){
    try{ return localStorage.getItem(k); }catch(e){ return null; }
  }

  function safeSet(k, v){
    try{ localStorage.setItem(k, v); }catch(e){}
  }

  function setPrayer(on){
    document.body.classList.toggle("prayer", on);
    safeSet(K_PRAYER, on ? "on" : "off");
    document.querySelectorAll("[data-prayer]").forEach(b => b.setAttribute("aria-pressed", on ? "true" : "false"));
  }

  function setFocus(on){
    document.body.classList.toggle("focus", on);
    safeSet(K_FOCUS, on ? "on" : "off");
    document.querySelectorAll("[data-focus]").forEach(b => b.setAttribute("aria-pressed", on ? "true" : "false"));
  }

  function initMenu(){
    const btn = document.querySelector("[data-menu-btn]");
    const menu = document.querySelector("[data-menu]");
    if(!btn || !menu) return;

    function openMenu(){
      menu.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
      safeSet(K_MENU, "on");
    }

    function closeMenu(){
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      safeSet(K_MENU, "off");
    }

    btn.addEventListener("click", function(){
      const open = menu.classList.contains("open");
      open ? closeMenu() : openMenu();
    });

    document.addEventListener("keydown", function(e){
      if(e.key === "Escape") closeMenu();
    });

    document.addEventListener("click", function(e){
      const inside = menu.contains(e.target) || btn.contains(e.target);
      if(!inside) closeMenu();
    });

    menu.addEventListener("click", function(e){
      const a = e.target && e.target.tagName === "A";
      if(a) closeMenu();
    });

    if(safeGet(K_MENU) === "on") openMenu();
  }

  function initModes(){
  setPrayer(safeGet(K_PRAYER) === "on");
  setFocus(safeGet(K_FOCUS) === "on");

  document.querySelectorAll("[data-prayer], [data-prayer-cta]").forEach(b => {
    b.addEventListener("click", function(){
      const next = !document.body.classList.contains("prayer");
      setPrayer(next);
    });
  });

  document.querySelectorAll("[data-focus]").forEach(b => {
    b.addEventListener("click", function(){
      const next = !document.body.classList.contains("focus");
      setFocus(next);
      updateExitVisibility();
    });
  });

  /* === ADD THIS SECTION BELOW === */

  let exitBtn = document.querySelector(".focus-exit");

  if(!exitBtn){
    exitBtn = document.createElement("button");
    exitBtn.className = "focus-exit";
    exitBtn.textContent = "Exit Scripture Focus";
    exitBtn.style.display = "none";
    document.body.appendChild(exitBtn);
  }

  function updateExitVisibility(){
    const on = document.body.classList.contains("focus");
    exitBtn.style.display = on ? "block" : "none";
  }

  exitBtn.addEventListener("click", function(){
    setFocus(false);
    updateExitVisibility();
  });

  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && document.body.classList.contains("focus")){
      setFocus(false);
      updateExitVisibility();
    }
  });

  updateExitVisibility();
}

  function initMailtoForm(){
    const form = document.querySelector("[data-mailto]");
    if(!form) return;

    form.addEventListener("submit", function(e){
      e.preventDefault();

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const reply = String(data.get("reply") || "").trim();
      const subject = String(data.get("subject") || "").trim();
      const message = String(data.get("message") || "").trim();

      const lines = [
        "Name: " + name,
        "Reply email: " + reply,
        "",
        message
      ];

      const body = encodeURIComponent(lines.join("\n"));
      const subj = encodeURIComponent(subject || "Website message");

      const href = "mailto:brad.hobbs13@icloud.com?subject=" + subj + "&body=" + body;
      window.location.href = href;
    });
  }

  document.addEventListener("DOMContentLoaded", function(){
    initMenu();
    initModes();
    initMailtoForm();
  });
})();
