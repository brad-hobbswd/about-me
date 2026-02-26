(function(){
  const MENU_KEY = "menuOpen";
  const PRAYER_KEY = "prayerMode";

  function safeGet(key){
    try{ return localStorage.getItem(key); }catch(e){ return null; }
  }

  function safeSet(key, val){
    try{ localStorage.setItem(key, val); }catch(e){}
  }

  function setPrayer(on){
    document.body.classList.toggle("prayer-mode", on);
    safeSet(PRAYER_KEY, on ? "on" : "off");
    const toggles = document.querySelectorAll("[data-prayer-toggle]");
    toggles.forEach(btn => btn.setAttribute("aria-pressed", on ? "true" : "false"));
  }

  function initPrayer(){
    const saved = safeGet(PRAYER_KEY) === "on";
    setPrayer(saved);

    const buttons = document.querySelectorAll("[data-prayer-toggle], [data-prayer-toggle-cta]");
    buttons.forEach(btn => {
      btn.addEventListener("click", function(){
        const next = !document.body.classList.contains("prayer-mode");
        setPrayer(next);
      });
    });
  }

  function initMenu(){
    const btn = document.querySelector("[data-menu-btn]");
    const menu = document.querySelector("[data-menu]");
    if(!btn || !menu) return;

    function openMenu(){
      menu.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      safeSet(MENU_KEY, "on");
    }

    function closeMenu(){
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      safeSet(MENU_KEY, "off");
    }

    btn.addEventListener("click", function(){
      const open = menu.classList.contains("is-open");
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
      const target = e.target;
      const link = target && target.tagName === "A";
      if(link) closeMenu();
    });

    const saved = safeGet(MENU_KEY) === "on";
    if(saved) openMenu();
  }

  document.addEventListener("DOMContentLoaded", function(){
    initPrayer();
    initMenu();
  });
})();