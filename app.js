"use-strict";

let lists = document.getElementById("lists");
let inputTodo = document.getElementById("inputTodo");
let todoAdd = document.getElementById("todoAdd");

todoAdd.addEventListener("click", () => {
	addInList(inputTodo.value);
	inputTodo.value = "";
});

inputTodo.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		addInList(inputTodo.value);
		inputTodo.value = "";
	}
});

function addInList(list) {
	if (!list) return;
	let newTodo = document.createElement("div");
	newTodo.classList.add("todo");
	newTodo.innerHTML = `<div class="todoText">${list}</div> <button class="deleteBtn" onclick=destroyElement(this) >X</button>`;
	lists.appendChild(newTodo);
}

function destroyElement(yes) {
	yes.parentElement.remove();
}
