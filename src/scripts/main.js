document.addEventListener("DOMContentLoaded", () => {
  const remTasks = document.getElementById("Rem-Tasks");
  const completedSection = document.getElementById("Completed-Items");

  document.addEventListener("click", (e) => {
    // 1. مدیریت چک‌باکس
    const checkbox = e.target.closest("input[type='checkbox']");
    if (checkbox) {
      const card = checkbox.closest(
        "div[id^='Task-Card-'], div[id^='Completed-Task-Card-']",
      );
      if (!card) return;

      const title = card.querySelector("h1");
      const detailsContainer = card.querySelector(".flex-col");
      let indicator = card.querySelector(".absolute.right-\\[-2px\\]");

      if (checkbox.checked) {
        // --- انتقال به انجام شده ---
        checkbox.className = "-mt-1";
        card.id = card.id.replace("Task-Card-", "Completed-Task-Card-");
        card.className =
          "relative flex flex-row w-full h-[66px] border-[1px] items-center border-[#E9E9E9] pb-[12px] pt-[12px] pr-[16px] pl-[16px] rounded-[12px] mt-4";
        title.className =
          "font-semibold text-[14px] line-through text-text-secondary w-[210px]";

        const elementsToRemove = detailsContainer
          ? detailsContainer.querySelectorAll("p, div:not(:has(h1))")
          : [];
        elementsToRemove.forEach((el) => {
          if (el.tagName !== "H1") el.remove();
        });

        if (!indicator) {
          indicator = document.createElement("div");
          indicator.className =
            "w-[4px] h-[42px] border-[1px] border-success rounded-t-[8px] rounded-b-[8px] bg-success absolute right-[-2px]";
          card.appendChild(indicator);
        }
        completedSection.appendChild(card);
      } else {
        // --- انتقال به لیست امروز ---
        checkbox.className = "mb-14";
        card.id = card.id.replace("Completed-Task-Card-", "Task-Card-");
        card.className =
          "relative flex flex-row w-full border-[1px] border-[#E9E9E9] p-4 rounded-[12px] mt-4";
        title.className = "font-semibold text-[14px] text-black w-[210px]";
        if (indicator) indicator.remove();

        remTasks.appendChild(card);
      }
      return;
    }

    // 2. مدیریت منوی گزینه‌ها
    const menuTrigger = e.target.closest("button.absolute.top-3.left-3");
    if (menuTrigger) {
      e.stopPropagation();
      document.querySelectorAll(".dynamic-menu").forEach((m) => m.remove());
      const menu = document.createElement("div");
      menu.className =
        "dynamic-menu absolute left-3 top-10 bg-white border border-[#E9E9E9] rounded-[8px] shadow-lg p-1 z-50 flex flex-row gap-1";
      const isCompleted = menuTrigger.closest("div[id^='Completed-Task-']");
      menu.innerHTML = `
        ${!isCompleted ? '<button class="edit-btn p-1.5 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"><img src="./src/images/edit.svg" class="w-5 h-5 pointer-events-none"></button>' : ""}
        <button class="delete-btn p-1.5 hover:bg-red-100 rounded-md cursor-pointer transition-colors">
            <img src="./src/images/trash.svg" class="w-5 h-5 pointer-events-none">
        </button>
      `;
      menuTrigger.parentElement.appendChild(menu);
      return;
    }

    // 3. مدیریت حذف
    const deleteBtn = e.target.closest(".delete-btn");
    if (deleteBtn) {
      const card = deleteBtn.closest(
        "div[id^='Task-Card-'], div[id^='Completed-Task-Card-']",
      );
      if (card) card.remove();
      document.querySelectorAll(".dynamic-menu").forEach((m) => m.remove());
      return;
    }

    // 4. بستن منو
    if (!e.target.closest(".dynamic-menu")) {
      document.querySelectorAll(".dynamic-menu").forEach((m) => m.remove());
    }
  });
});
