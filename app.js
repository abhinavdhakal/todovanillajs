"use-strict";

let lists = document.getElementById("lists");
let inputTodo = document.getElementById("inputTodo");
let todoAdd = document.getElementById("todoAdd");
let clearBtn = document.getElementById("clearBtn");
let todoMap;

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
    if (newTodo.classList.contains("finished")) {
      newTodo.classList.remove("finished");
    } else {
      newTodo.classList.add("finished");
    }
  });
  newTodo.innerHTML = `<div class="todoText">${list}</div> <button class="deleteBtn" onclick=destroyElement(this) style="text-decoration:none" >X</button>`;
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
