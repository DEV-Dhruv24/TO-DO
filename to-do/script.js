// Load tasks from localStorage when the page has fully loaded
document.addEventListener('DOMContentLoaded', loadTasks);

// Add a task when the 'Add Task' button is clicked
document.getElementById('addTaskButton').addEventListener('click', addTask);

function addTask() {
    // Get the value of the task input field and trim any extra spaces
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    // Alert the user if the input field is empty and exit the function
    if (taskText === '') {
        alert('TO DO TASK FIRST ENTER YOUR TASK');
        return;
    }

    // Create a new list item element for the task
    const taskList = document.getElementById('taskList');
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <input type="checkbox" class="checkbox" onclick="completeTask(this)">
        ${taskText}
        <button class="delete-btn" onclick="deleteTask(this)">✖</button>
    `;

    // Append the new task to the task list
    taskList.appendChild(newTask);
    // Clear the input field
    taskInput.value = '';
    // Save the updated list of tasks to localStorage
    saveTasks();
}

function completeTask(checkbox) {
    // Get the parent list item of the checkbox
    const taskItem = checkbox.parentElement;

    // If the checkbox is checked, add a 'completed' class to the task item and show congratulations message
    if (checkbox.checked) {
        taskItem.classList.add('completed');
        showCongratulations();
    } else {
        // Remove the 'completed' class if the checkbox is unchecked
        taskItem.classList.remove('completed');
    }
    // Save the updated list of tasks to localStorage
    saveTasks();
}

function deleteTask(button) {
    // Get the parent list item of the delete button
    const taskItem = button.parentElement;
    // Remove the list item from the task list
    taskItem.remove();
    // Save the updated list of tasks to localStorage
    saveTasks();
}

function showCongratulations() {
    // Get the congratulations message element
    const message = document.querySelector('.congratulationMessage');
    // Show the congratulations message
    message.style.display = 'block';
    // Hide the congratulations message after 2 seconds
    setTimeout(() => {
        message.style.display = 'none';
    }, 2000);
}

function saveTasks() {
    // Get the task list element
    const taskList = document.getElementById('taskList');
    const tasks = [];

    // Iterate over each list item in the task list
    taskList.querySelectorAll('li').forEach(taskItem => {
        // Get the task text and remove the delete button text
        const taskText = taskItem.innerText.replace('✖', '').trim();
        // Check if the checkbox is checked
        const isChecked = taskItem.querySelector('input.checkbox').checked;
        // Add the task to the tasks array with text and checked status
        tasks.push({ text: taskText, checked: isChecked });
    });

    // Save the tasks array to localStorage as a JSON string
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    // Get the tasks array from localStorage and parse it as JSON
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Get the task list element
    const taskList = document.getElementById('taskList');

    // Iterate over each task in the tasks array
    tasks.forEach(task => {
        // Create a new list item element for each task
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <input type="checkbox" class="checkbox" ${task.checked ? 'checked' : ''} onclick="completeTask(this)">
            ${task.text}
            <button class="delete-btn" onclick="deleteTask(this)">✖</button>
        `;
        // Append the new task to the task list
        taskList.appendChild(newTask);
    });
}
