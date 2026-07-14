const addingTask = document.getElementById("task-adder");
const creatTask = document.getElementById("creatTask");

const yellowButton = document.getElementById("yellowButton");
const greenButton = document.getElementById("greenButton");
const redButton = document.getElementById("redButton");

const allButtons = [yellowButton, redButton, greenButton];

const redClose = document.getElementById("redClose");
const yellowClose = document.getElementById("yellowClose");
const greenClose = document.getElementById("greenClose");

const allClose = [yellowClose, redClose, greenClose];

const img = document.getElementById("img");
const tags = document.getElementById("tags");
const buttons = document.getElementById("buttons");

const deleteAdd = document.getElementById("deleteAdd");

const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");

const submit = document.getElementById("submit");
const taskName = document.getElementById("taskName");
const expression = document.getElementById("expression");

const checkedCount = document.getElementById("checkedCount");
const doneTasks = document.getElementById("doneTasks");
const NoTask = document.getElementById("No-Task");

//=====================
let tasksList = JSON.parse(localStorage.getItem("tasksList")) || [];

function saveTasks() {
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
}
//====================

addingTask.addEventListener("click", () => {
    addingTask.classList.add("hidden");
    creatTask.classList.remove("hidden");
    updatPicture();
});

tags.addEventListener("click", () => {
    if (img.src.includes("src/images/tag-right-1.svg")) {
        img.src = "./src/images/tag-right-2.svg";
    } else {
        img.src = "./src/images/tag-right-1.svg";
    }

    buttons.classList.toggle("hidden");
});

deleteAdd.addEventListener("click", () => {
    creatTask.classList.toggle("hidden");
    addingTask.classList.toggle("hidden");
    updatPicture();
});

function selectButton(selected, closeIcon) {
    allButtons.forEach((btn) => {
        if (btn !== selected) {
            btn.classList.add("hidden");
        }
    });
    closeIcon.classList.remove("hidden");
    buttons.classList.remove("border-[1px]", "border-[#EBEDEF]");
    line1.classList.add("hidden");
    line2.classList.add("hidden");
    checkForm();
}

yellowButton.addEventListener("click", () =>
    selectButton(yellowButton, yellowClose),
);
redButton.addEventListener("click", () => selectButton(redButton, redClose));
greenButton.addEventListener("click", () =>
    selectButton(greenButton, greenClose),
);

allClose.forEach((closeIcon, i) => {
    closeIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        allButtons.forEach((btn) => btn.classList.remove("hidden"));
        closeIcon.classList.add("hidden");
        line1.classList.remove("hidden");
        line2.classList.remove("hidden");
        buttons.classList.add("border-[1px]", "border-[#EBEDEF]");
        checkForm();
    });
});

taskName.addEventListener("input", checkForm);

expression.addEventListener("input", checkForm);

function checkForm() {
    const colorSelected = allClose.some((c) => !c.classList.contains("hidden"));
    if (taskName.value !== "" && expression.value !== "" && colorSelected) {
        submit.disabled = false;
        submit.classList.remove("bg-blue-300");
        submit.classList.add("bg-[#007BFF]");
    } else {
        submit.disabled = true;
        submit.classList.remove("bg-[#007BFF]");
        submit.classList.add("bg-blue-300");
    }
}

const readTask = document.getElementById("readTask");
submit.addEventListener("click", () => {
    const colorSelected = allClose.some((c) => !c.classList.contains("hidden"));

    if (taskName.value === "" || expression.value === "" || !colorSelected) {
        return;
    }

    const tasks = document.createElement("div");
    const colorBorder = getSelectedColor();
    const badge = getSelectedBadge();

    //==========================
    const taskId = Date.now();
    tasks.dataset.id = taskId;
    //==========================

    tasks.className =
        "relative flex flex-row w-full min-h-[66px] border-[1px] border-[#E9E9E9] pb-[12px] pt-[12px] pr-[16px] pl-[16px] rounded-[12px] mt-4";
    tasks.innerHTML = `
  <input class="mt-1 self-start" type="checkbox" />
  <div class="flex flex-col gap-2 mr-6 flex-1">
    <div class="md:flex md:flex-row md:mb-4">
      <h1 class="font-semibold text-[14px] text-text-primary md:mt-[2px] ml-[2px]">
        ${taskName.value}
      </h1>
      <div class="inline-flex justify-center items-center pt-0.5 pb-0.5 pr-2 pl-2 gap-2 ${badge.bg} rounded-[4px] h-5 mt-1 md:mr-1">
        <span class="flex justify-center items-center text-[10px] ${badge.color} text-center pt-1">${badge.text}</span>
      </div>
    </div>
    <p class="font-normal text-[12px] text-text-secondary">
      ${expression.value}
    </p>
  </div>
  <button class="absolute top-3 left-3">
    <img class="w-[4px] h-[18px]" src="./src/images/option.svg" alt="Edit-Task" />
  </button>
  <div class="w-[4px] h-[75%] border-[1px] ${colorBorder.border} rounded-t-[8px] rounded-b-[8px] ${colorBorder.bg} absolute right-[-2px]"></div>
`;
    readTask.appendChild(tasks);

    //===========================
    tasksList.push({
        id: taskId,
        name: taskName.value,
        expression: expression.value,
        colorBorder: colorBorder,
        badge: badge,
        checked: false,
    });
    saveTasks();
    //============================

    creatTask.classList.add("hidden");
    addingTask.classList.remove("hidden");

    taskName.value = "";
    expression.value = "";

    allButtons.forEach((btn) => btn.classList.remove("hidden"));
    allClose.forEach((closeIcon) => closeIcon.classList.add("hidden"));

    const checkBox = tasks.querySelector("input[type='checkbox']");
    const taskTitle = tasks.querySelector("h1");
    const taskBadge = tasks.querySelector("div.inline-flex");
    const taskExp = tasks.querySelector("p");

    checkBox.addEventListener("change", () => {
        //===========================
        const savedTask = tasksList.find((t) => t.id == tasks.dataset.id);
        if (savedTask) {
            savedTask.checked = checkBox.checked;
            saveTasks();
        }
        //============================

        if (checkBox.checked) {
            taskTitle.classList.add("line-through");
            taskBadge.style.display = "none";
            taskExp.classList.add("hidden");
            doneTasks.appendChild(tasks);
        } else {
            taskTitle.classList.remove("line-through");
            taskBadge.style.display = "";
            taskExp.classList.remove("hidden");
            readTask.appendChild(tasks);
        }

        updateCounter();
        updateDoneCounter();
        updateNoTaskVisibility();
    });

    checkForm();
    updatPicture();
    updateCounter();
    updateDoneCounter();
});

function getSelectedColor() {
    if (!redClose.classList.contains("hidden"))
        return { border: "border-error", bg: "bg-error" };
    if (!yellowClose.classList.contains("hidden"))
        return { border: "border-warning", bg: "bg-warning" };
    if (!greenClose.classList.contains("hidden"))
        return { border: "border-success", bg: "bg-success" };
}

function getSelectedBadge() {
    if (!redClose.classList.contains("hidden")) {
        return { text: "بالا", bg: "bg-[#FFE2DB]", color: "text-error" };
    }
    if (!yellowClose.classList.contains("hidden")) {
        return { text: "متوسط", bg: "bg-[#FFEFD6]", color: "text-warning" };
    }
    if (!greenClose.classList.contains("hidden")) {
        return { text: "پایین", bg: "bg-[#C3FFF1]", color: "text-success" };
    }
}

const counter = document.getElementById("counter");

function updateCounter() {
    const count = readTask.children.length;
    if (count !== 0) {
        counter.textContent = `${count} تسک را باید انجام دهید`;
    } else {
        counter.textContent = "تسکی برای امروز ندارید!";
    }
    updatPicture();
}

function updateDoneCounter() {
    const count = doneTasks.children.length;

    checkedCount.textContent = `${count} تسک را انجام دادید`;
    updatPicture();
}

function updatPicture() {
    const boxIsOpen = !creatTask.classList.contains("hidden");
    const hasTasks = readTask.children.length > 0;

    if (boxIsOpen || hasTasks) {
        NoTask.classList.add("hidden");
    } else {
        NoTask.classList.remove("hidden");
    }
}

//================================
function loadTasks() {
    tasksList.forEach((task) => {
        const tasks = document.createElement("div");
        tasks.dataset.id = task.id;

        tasks.className =
            "relative flex flex-row w-full min-h-[66px] border-[1px] border-[#E9E9E9] pb-[12px] pt-[12px] pr-[16px] pl-[16px] rounded-[12px] mt-4";
        tasks.innerHTML = `
  <input class="mt-1 self-start" type="checkbox" ${task.checked ? "checked" : ""} />
  <div class="flex flex-col gap-2 mr-6 flex-1">
    <div class="md:flex md:flex-row md:mb-4">
      <h1 class="font-semibold text-[14px] text-text-primary md:mt-[2px] ml-[2px] ${task.checked ? "line-through" : ""}">
        ${task.name}
      </h1>
      <div class="inline-flex justify-center items-center pt-0.5 pb-0.5 pr-2 pl-2 gap-2 ${task.badge.bg} rounded-[4px] h-5 mt-1 md:mr-1" style="${task.checked ? "display:none" : ""}">
        <span class="flex justify-center items-center text-[10px] ${task.badge.color} text-center pt-1">${task.badge.text}</span>
      </div>
    </div>
    <p class="font-normal text-[12px] text-text-secondary ${task.checked ? "hidden" : ""}">
      ${task.expression}
    </p>
  </div>
  <button class="absolute top-3 left-3">
    <img class="w-[4px] h-[18px]" src="./src/images/option.svg" alt="Edit-Task" />
  </button>
  <div class="w-[4px] h-[75%] border-[1px] ${task.colorBorder.border} rounded-t-[8px] rounded-b-[8px] ${task.colorBorder.bg} absolute right-[-2px]"></div>
`;

        if (task.checked) {
            doneTasks.appendChild(tasks);
        } else {
            readTask.appendChild(tasks);
        }

        const checkBox = tasks.querySelector("input[type='checkbox']");
        const taskTitle = tasks.querySelector("h1");
        const taskBadge = tasks.querySelector("div.inline-flex");
        const taskExp = tasks.querySelector("p");

        checkBox.addEventListener("change", () => {
            const savedTask = tasksList.find((t) => t.id == tasks.dataset.id);
            if (savedTask) {
                savedTask.checked = checkBox.checked;
                saveTasks();
            }

            if (checkBox.checked) {
                taskTitle.classList.add("line-through");
                taskBadge.style.display = "none";
                taskExp.classList.add("hidden");
                doneTasks.appendChild(tasks);
            } else {
                taskTitle.classList.remove("line-through");
                taskBadge.style.display = "";
                taskExp.classList.remove("hidden");
                readTask.appendChild(tasks);
            }

            updateCounter();
            updateDoneCounter();
        });
    });

    updateCounter();
    updateDoneCounter();
    updatPicture();
}

loadTasks();
