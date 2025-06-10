const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");
const searchInput = document.getElementById("searchInput");
const filter = document.getElementById("filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let isDark = JSON.parse(localStorage.getItem("darkMode")) || false;

if (isDark) document.body.classList.add("dark");

function updateThemeToggleText() {
  themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
}

updateThemeToggleText();

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  const keyword = searchInput.value.toLowerCase();
  const status = filter.value;

  tasks.forEach((task, index) => {
    if (
      (status === "active" && task.completed) ||
      (status === "completed" && !task.completed) ||
      !task.text.toLowerCase().includes(keyword)
    )
      return;

    const li = document.createElement("li");
    li.setAttribute("draggable", "true");
    li.dataset.index = index;
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    li.addEventListener("click", () => {
      task.completed = !task.completed;
      save();
      renderTasks();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      save();
      renderTasks();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });

  enableDrag();
}

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({ text, completed: false });
  save();
  taskInput.value = "";
  renderTasks();
});
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  isDark = !isDark;
  localStorage.setItem("darkMode", JSON.stringify(isDark));
  updateThemeToggleText();
});

searchInput.addEventListener("input", renderTasks);
filter.addEventListener("change", renderTasks);

function enableDrag() {
  let dragged;

  taskList.querySelectorAll("li").forEach((item, index) => {
    item.addEventListener("dragstart", () => {
      dragged = index;
    });

    item.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    item.addEventListener("drop", () => {
      const droppedIndex = Number(item.dataset.index);
      if (dragged === droppedIndex) return;

      const moved = tasks.splice(dragged, 1)[0];
      tasks.splice(droppedIndex, 0, moved);
      save();
      renderTasks();
    });
  });
}

renderTasks();
