import { initDrawer } from "./modules/drawerMenu.js";
import { themeToggle } from "./modules/theme.js";
import { dateFormatter } from "./modules/dateFormatter.js";
document.addEventListener("DOMContentLoaded", () => {
  initDrawer();
  themeToggle();
  dateFormatter();
});
