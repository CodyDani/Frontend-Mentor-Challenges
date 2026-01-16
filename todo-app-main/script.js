//Grabbing all elements
const colorThemeEl = document.getElementById("color-theme");
const submitBtnEl = document.querySelector(".submit-list");
const userInputEl = document.querySelector(".user-input");

//Array of all list items
let todos = loadTodos();
let currentSorting = "all";

//Color theme toggling functionality
colorThemeEl.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  let newTheme;

  if (currentTheme === "dark") {
    newTheme = "light";
    colorThemeEl.src = "images/icon-moon.svg";
    colorThemeEl.alt = "dark mode";
  } else {
    newTheme = "dark";
    colorThemeEl.src = "images/icon-sun.svg";
    colorThemeEl.alt = "light mode";
  }

  document.documentElement.setAttribute("data-theme", newTheme);
});

//Inputing todos with the Enter key
userInputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    submitBtnEl.click();
  }
});

//listening for a submitted list from user
submitBtnEl.addEventListener("click", () => {
  const userListItem = userInputEl.value;
  if (userListItem === "") return;
  todos.push({
    id: Date.now() + Math.random(),
    text: userListItem,
    completed: false,
  });
  saveList();
  userInputEl.value = "";
  displayTodos();
});

//Displaying all todos
function displayTodos() {
  //   todos.innerHTML = [];

  const ulMain = document.querySelector(".main");
  ulMain.innerHTML = "";

  let sortedTodos = todos;

  if (currentSorting === "active") {
    sortedTodos = todos.filter((todo) => todo.completed === false);
  } else if (currentSorting === "completed") {
    sortedTodos = todos.filter((todo) => todo.completed === true);
  }

  sortedTodos.forEach((todo) => {
    const list = document.createElement("li");

    const listDiv = document.createElement("div");
    listDiv.classList.add("check-list");

    if (todo.completed) {
      listDiv.classList.add("checked");
    }

    const checkBox = document.createElement("button");

    const span = document.createElement("span");
    span.textContent = todo.text;

    const cancelBtn = document.createElement("img");
    cancelBtn.src = "images/icon-cross.svg";

    listDiv.append(checkBox, span);
    list.append(listDiv, cancelBtn);
    ulMain.appendChild(list);

    listDiv.addEventListener("click", () => {
      toggleTodos(todo.id);
      saveList();
    });

    cancelBtn.addEventListener("click", () => cancelListBtn(todo.id));
  });

  if (todos.length >= 1) {
    renderFooter(ulMain);
  }
}

//list information display
function renderFooter(parent) {
  const hasCompleted = todos.some((todo) => todo.completed);

  const itemsLeftNo = todos.filter((todo) => {
    return todo.completed === false;
  }).length;

  const mainFooter = document.createElement("div");
  mainFooter.classList.add("main-footer");

  const itemLeft = document.createElement("span");
  itemLeft.textContent = `${itemsLeftNo} ${
    itemsLeftNo < 2 ? "item left" : "items left"
  }`;

  const listState = document.createElement("span");
  listState.classList.add("state");

  const allState = document.createElement("button");
  allState.classList.add("all-state");
  allState.textContent = "All";

  const activeState = document.createElement("button");
  activeState.classList.add("active-state");
  activeState.textContent = "Active";

  const completedState = document.createElement("button");
  completedState.classList.add("completed-state");
  completedState.textContent = "Completed";

  const clearCompleted = document.createElement("button");
  clearCompleted.classList.add("clear-completed");
  clearCompleted.textContent = "Clear Completed";

  listState.append(allState, activeState, completedState);
  mainFooter.append(itemLeft, listState, clearCompleted);
  parent.appendChild(mainFooter);

  if (!hasCompleted) {
    clearCompleted.style.display = "none";
    completedState.style.display = "none";
    activeState.style.display = "none";
  } else {
    clearCompleted.style.display = "block";
    completedState.style.display = "block";
    activeState.style.display = "block";
  }

  clearCompleted.addEventListener("click", (e) => {
    e.preventDefault();
    clearCompletedTodos();
    saveList();
  });
  allState.addEventListener("click", (e) => {
    e.preventDefault();
    allState.classList.toggle("active", currentSorting === "all");
    allStateTodos();
  });
  activeState.addEventListener("click", (e) => {
    e.preventDefault();
    activeState.classList.toggle("active", currentSorting === "active");
    activeStateTodos();
  });
  completedState.addEventListener("click", (e) => {
    e.preventDefault();
    completedState.classList.toggle("active", currentSorting === "completed");
    completedStateTodos();
  });
}

//Utility function for toggling lists
function toggleTodos(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });

  displayTodos();
}

//Utility function for clearing completed lists from the array
function clearCompletedTodos() {
  todos = todos.filter((todo) => {
    return todo.completed === false;
  });
  displayTodos();
}

//Utility function for displaying all lists
function allStateTodos() {
  currentSorting = "all";
  displayTodos();
}

//Utility function for displaying only active lists
function activeStateTodos() {
  currentSorting = "active";
  displayTodos();
}

//Utility function for displaying only completed lists
function completedStateTodos() {
  currentSorting = "completed";
  displayTodos();
}

//Utility function for cancelling each list
function cancelListBtn(id) {
  todos = todos.filter((todo) => {
    if (todo.id === id) return;
    return todo.id !== id;
  });
  saveList();
  displayTodos();
}

//Utility function for persisting in browser
function saveList() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    return JSON.parse(storedTodos);
  }
  return [];
}

window.addEventListener("DOMContentLoaded", displayTodos());
