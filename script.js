(() => {
  const mobile = window.matchMedia("(max-width: 768px)");
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("sideMenu");
  const overlay = document.getElementById("menuOverlay");
  const closeBtn = document.getElementById("menuClose");
  if (!toggle || !menu || !overlay || !closeBtn) return;

  const openMenu = () => {
    document.body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
    closeBtn.focus({ preventScroll: true });
  };

  const closeMenu = (returnFocus = true) => {
    if (!document.body.classList.contains("menu-open")) return;
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    if (returnFocus) toggle.focus({ preventScroll: true });
  };

  toggle.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", () => closeMenu());
  overlay.addEventListener("click", () => closeMenu());

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  mobile.addEventListener("change", (e) => {
    if (!e.matches) {
      closeMenu(false);
      menu
        .querySelectorAll(".open")
        .forEach((el) => el.classList.remove("open"));
    }
  });

  menu.addEventListener("click", (e) => {
    if (!mobile.matches) return;
    const link = e.target.closest(".sub > .menu-link, .sub-menu-svg");
    if (!link || !menu.contains(link)) return;
    e.preventDefault();
    link.parentElement.classList.toggle("open");
  });
})();
