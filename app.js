"use-strict";

let lists = document.getElementById("lists");
let inputTodo = document.getElementById("inputTodo");
let todoAdd = document.getElementById("todoAdd");
let clearBtn = document.getElementById("clearBtn");
let themeBtn = document.getElementById("themeBtn");
let html = document.getElementById("html");
let todoMap;

let themeIconName = "fa-moon-o";

themeBtn.innerHTML = `<i class="fa ${themeIconName}"></i>`;

function saveToLocal(Map) {
  localStorage.setItem("todos", JSON.stringify([...Map]));
}

function getFromLocal() {
  return new Map(JSON.parse(localStorage.getItem("todos")));
}

if (getFromLocal().size === 0) {
  todoMap = new Map();
  todoMap.set("N", 0);
  saveToLocal(todoMap);
} else {
  todoMap = getFromLocal();
  todoMap.forEach((value, key) => {
    if (key != "N") addInList(value, key, false);
  });
}

let local = localStorage.getItem;
todoAdd.addEventListener("click", () => {
  addInList(inputTodo.value, todoMap.get("N") + 1, true);
  inputTodo.value = "";
});

inputTodo.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addInList(inputTodo.value, todoMap.get("N") + 1, true);
    inputTodo.value = "";
  }
});

function addInList(list, index, hi) {
  if (!list) return;
  if (hi) {
    todoMap.set(index, list);
    todoMap.set("N", todoMap.get("N") + 1);
    saveToLocal(todoMap);
  }
  let newTodo = document.createElement("div");
  newTodo.indexN = index;
  newTodo.classList.add("todo");
  newTodo.addEventListener("click", (e) => {
    if (newTodo.firstElementChild.classList.contains("finished")) {
      newTodo.firstElementChild.classList.remove("finished");
    } else {
      newTodo.firstElementChild.classList.add("finished");
    }
  });
  newTodo.innerHTML = `<div class="todoText">${list}</div> <button class="deleteBtn" onclick=destroyElement(this) style="text-decoration:none" ><i class="material-icons">delete</i></button>`;
  lists.appendChild(newTodo);
}

function destroyElement(yes) {
  todoMap.delete(yes.parentElement.indexN);
  saveToLocal(todoMap);
  yes.parentElement.remove();
}

clearBtn.addEventListener("click", () => {
  console.log("Cleared!");
  todoMap = "";
  saveToLocal(todoMap);
  location.reload();
});

if (localStorage.getItem("theme")) {
  if (localStorage.getItem("theme") === "theme-light") {
    setLightTheme();
    console.log("setlight");
  } else {
    setDarkTheme();
    console.log("setdark");
  }

  themeBtn.innerHTML = `<i class="fa ${themeIconName}"></i>`;
}

themeBtn.addEventListener("click", themeChange);

function themeChange() {
  if (html.classList.contains("theme-light")) {
    setDarkTheme();
  } else {
    setLightTheme();
  }
  themeBtn.innerHTML = `<i class="fa ${themeIconName}"></i>`;
}

function setDarkTheme() {
  html.classList.remove("theme-light");
  html.classList.add("theme-dark");
  localStorage.setItem("theme", "theme-dark");
  themeIconName = "fa-sun-o";
  themeBtn.style.backgroundColor = "#3c3836";
  themeBtn.style.color = "#8ec07c";
}

function setLightTheme() {
  html.classList.add("theme-light");
  html.classList.remove("theme-dark");
  localStorage.setItem("theme", "theme-light");
  themeIconName = "fa-moon-o";
  themeBtn.style.backgroundColor = "white";
  themeBtn.style.color = "black";
}
