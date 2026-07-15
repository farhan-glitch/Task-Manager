import { initDrawer } from "./modules/drawerMenu.js";
import { themeToggle } from "./modules/theme.js";
import { dateFormatter } from "./modules/dateFormatter.js";
import { initCreateReadTasks } from "./modules/createReadTasks.js";
import { setupTaskOptions } from "./modules/editDeleteTasks.js";
document.addEventListener("DOMContentLoaded", () => {
  initDrawer();
  themeToggle();
  dateFormatter();
  initCreateReadTasks();
});
