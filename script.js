const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
let tasks = [];

taskForm.addEventListener('submit', addTask);

function addTask(event) {
    event.preventDefault();

    const taskTitle = document.getElementById('task-title').value;
    const taskDesc = document.getElementById('task-desc').value;
    const taskDate = document.getElementById('task-date').value;

    // Prevent adding an empty task
    if (taskTitle.trim() === "") {
        alert("Task title cannot be empty.");
        return;
    }

    const newTask = {
        title: taskTitle,
        description: taskDesc,
        dueDate: taskDate,
        completed: false, // New property to track completion
    };

    tasks.push(newTask);
    displayTasks();
    taskForm.reset();
}

function displayTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        
        // Add 'completed' class if the task is marked as done
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        taskItem.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <small>Due: ${task.dueDate}</small>
            </div>
            <div>
                <button onclick="toggleComplete(${index})">
                    ${task.completed ? "Undo" : "Mark as Done"}
                </button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function editTask(index) {
    const task = tasks[index];
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-desc').value = task.description;
    document.getElementById('task-date').value = task.dueDate;

    taskForm.removeEventListener('submit', addTask);
    taskForm.addEventListener('submit', function updateTask(event) {
        event.preventDefault();

        tasks[index] = {
            title: document.getElementById('task-title').value,
            description: document.getElementById('task-desc').value,
            dueDate: document.getElementById('task-date').value,
            completed: tasks[index].completed, // Preserve the completed status
        };

        displayTasks();
        taskForm.reset();
        taskForm.removeEventListener('submit', updateTask);
        taskForm.addEventListener('submit', addTask);
    });
}

function deleteTask(index) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
        tasks.splice(index, 1);
        displayTasks();
    }
}
