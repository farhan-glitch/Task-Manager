export const initDrawer = () => {
  // DOM Selection
  const hamburgerButton = document.getElementById("open-menu-btn");
  const closeButton = document.getElementById("close-menu-btn");
  const drawerMenu = document.getElementById("drawer-menu");
  const overlayBackground = document.getElementById("overlay");
  // Define Functions
  function openMenu() {
    drawerMenu.classList.remove("translate-x-full");
    drawerMenu.classList.add("translate-x-0");

    overlayBackground.classList.remove("opacity-0");
    overlayBackground.classList.remove("pointer-events-none");
  }
  function closeMenu() {
    drawerMenu.classList.remove("translate-x-0");
    drawerMenu.classList.add("translate-x-full");

    overlayBackground.classList.add("opacity-0");
    overlayBackground.classList.add("pointer-events-none");
  }
  // Event Listeners
  hamburgerButton.addEventListener("click", openMenu);
  closeButton.addEventListener("click", closeMenu);
  overlayBackground.addEventListener("click", closeMenu);
};
