  export function setupTaskOptions(tasks, taskObj, tasksList, saveTasks, updateCounter, updateDoneCounter, updatPicture) {
  const optionsBtn = tasks.querySelector(".optionBtn");
  const menu = tasks.querySelector(".optionsMenu");
  const editBtn = tasks.querySelector(".editBtn");
  const deleteBtn = tasks.querySelector(".deleteBtn");
  const taskTitle = tasks.querySelector("h1");
  const taskExp = tasks.querySelector("p");

  optionsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", () => {
    tasks.remove();
    const index = tasksList.findIndex((t) => t.id == taskObj.id);
    if (index !== -1) tasksList.splice(index, 1);
    saveTasks();
    updateCounter();
    updateDoneCounter();
    updatPicture();
  });

  editBtn.addEventListener("click", () => {
    menu.classList.add("hidden");
    let editPanel = tasks.nextElementSibling;
    const isEditPanel = editPanel && editPanel.classList.contains("editPanel");

    if (isEditPanel) {
      editPanel.classList.toggle("hidden");
      return;
    }

    editPanel = document.createElement("div");
    editPanel.className =
      "editPanel border-[1px] border-[#E9E9E9] rounded-[12px] p-4 mt-2";
    editPanel.innerHTML = `
      <input type="text" class="editTitle font-semibold text-[14px] w-full outline-none mb-2" value="${taskObj.name}" />
      <p class="editDesc font-normal text-[12px] text-text-secondary outline-none mb-4" contenteditable="true">${taskObj.expression}</p>
      <button class="saveEditBtn bg-[#007BFF] text-white text-[12px] font-semibold rounded-md px-4 py-2">ویرایش تسک</button>
    `;
    tasks.after(editPanel);

    const saveBtn = editPanel.querySelector(".saveEditBtn");
    saveBtn.addEventListener("click", () => {
      const newTitle = editPanel.querySelector(".editTitle").value;
      const newDesc = editPanel.querySelector(".editDesc").textContent;

      taskTitle.textContent = newTitle;
      taskExp.textContent = newDesc;

      taskObj.name = newTitle;
      taskObj.expression = newDesc;
      saveTasks();

      editPanel.classList.add("hidden");
    });
  });
}