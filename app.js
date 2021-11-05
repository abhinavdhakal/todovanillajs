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
	yes.parentElement.remove();
}
