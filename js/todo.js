var task_input = document.querySelector("#taskInput"),
    tasks = document.querySelector("#tasks"),
    tasks_counter = document.getElementById("tasksCounter"),
    finished_tasks_counter = document.getElementById("finishedTasksCounter"),
    tasks_content = JSON.parse(localStorage.getItem("tasks")) ? JSON.parse(localStorage.getItem("tasks")) : [];


window.onload = function () {


    for (let index = 0; index < tasks_content.length; index++) {
        const task = tasks_content[index];
        tasks.innerHTML += `
        <li class="list-group-item list-group-item-action list-group-item-warning d-flex justify-content-between">
                ${task}
                <i class="fa-solid fa-trash" style="color: #ff0000;"></i>
            </li>`;
    }
    counter();
    deleteTask();
}


task_input.addEventListener("keyup", function (ev) {
    if (ev.key === "Enter") {
        if (task_input.value !== "") {
            if (tasks_content.includes(task_input.value)) {
                var userConfirm = confirm("This task is founded do you want to add it again");
                if (userConfirm) {
                    addNewTask();
                    finishTask();
                    counter();
                    deleteTask();
                    updateTasks();
                    saveInLocalStorage()
                }
                focusOnInput()
            }
            else {
                addNewTask();
                focusOnInput();
                finishTask();
                counter();
                deleteTask();
                updateTasks();
                saveInLocalStorage()
            }
        } else {
            alert("Your task is empty");
        }
    }
})


function addNewTask() {
    tasks.innerHTML += `
    <li class="list-group-item list-group-item-action list-group-item-warning d-flex justify-content-between">
        ${task_input.value}
        <i class="fa-solid fa-trash" style="color: #ff0000;"></i>
    </li>`;
}

function focusOnInput() {
    task_input.value = "";
    task_input.focus();
}
function counter() {
    tasks_counter.innerHTML = tasks.children.length;
}
function finishTask() {
    for (let index = 0; index < tasks.children.length; index++) {
        const task = tasks.children[index];
        task.onclick = function () {
            task.classList.toggle("list-group-item-success");
            task.classList.toggle("list-group-item-warning");
            finishedCounter();
        };
    }
}

function deleteTask() {
    var delete_icons = document.getElementsByClassName("fa-trash");

    for (let index = 0; index < delete_icons.length; index++) {
        const delete_icon = delete_icons[index];
        delete_icon.onclick = function () {
            delete_icon.parentElement.remove();
            counter();
        };
    }
    updateTasks();
    saveInLocalStorage()
}

function finishedCounter() {
    var finished_tasks = document.getElementsByClassName(
        "list-group-item-success"
    );

    finished_tasks_counter.innerHTML = finished_tasks.length;
}
function updateTasks() {
    tasks_content = [];
    for (let index = 0; index < tasks.children.length; index++) {
        const task = tasks.children[index];
        tasks_content.push(task.textContent.trim())
    }
}

function saveInLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks_content))
}

