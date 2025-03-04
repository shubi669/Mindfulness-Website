const taskInput = document.getElementById('taskInput');
const timeInput = document.getElementById('timeInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Task Organizer Functions
document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    const timeInput = document.getElementById('timeInput');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    loadTasks();

    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', addTask);
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        const taskTime = timeInput.value;
        
        if (taskText === '') return;

        const task = {
            text: taskText,
            time: taskTime,
            completed: false,
            id: Date.now()
        };

        // Create task element
        const li = createTaskElement(task);
        taskList.appendChild(li);

        // Save to localStorage
        saveTask(task);

        // Clear inputs
        taskInput.value = '';
        timeInput.value = '';
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.className = 'task';
        li.dataset.id = task.id;
        if (task.completed) li.classList.add('done');

        const taskContent = document.createElement('span');
        taskContent.textContent = task.text;
        taskContent.addEventListener('click', () => toggleTask(li, task.id));

        const timeSpan = document.createElement('span');
        timeSpan.className = 'task-time';
        timeSpan.textContent = task.time;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'deleteBtn';
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', () => deleteTask(li, task.id));

        li.appendChild(taskContent);
        if (task.time) li.appendChild(timeSpan);
        li.appendChild(deleteBtn);

        return li;
    }

    function toggleTask(li, taskId) {
        li.classList.toggle('done');
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        if (taskIndex > -1) {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    function deleteTask(li, taskId) {
        li.remove();
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const filteredTasks = tasks.filter(t => t.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    }

    function saveTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(task => {
            const li = createTaskElement(task);
            taskList.appendChild(li);
        });
    }
});

function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const isPM = hour >= 12;
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${isPM ? 'PM' : 'AM'}`;
}

function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px";
    } else {
        sidebar.style.left = "0px";
    }
}

function toggleDropdown() {
    var dropdown = document.getElementById("dropdownMenu");
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
}

function closeSidebar(event) {
    var sidebar = document.getElementById("sidebar");
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px";
    }
}

