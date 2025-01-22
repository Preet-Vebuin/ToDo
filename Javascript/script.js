const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const searchInput = document.getElementById('search');

// Create a tooltip element
const tooltip = document.createElement('div');
tooltip.classList.add('tooltip');
tooltip.textContent = 'Please fill in all fields!';
document.body.appendChild(tooltip);
tooltip.style.display = 'none'; // Hide the tooltip initially

// Array to hold the to-dos
let todos = [];

// Function to render the to-do items
function renderTodos(filteredTodos = todos) {
  todoList.innerHTML = '';
  filteredTodos.forEach((todo, index) => {
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';

    const dueDate = new Date(todo.dueDate);
    const daysLeft = Math.ceil((dueDate - new Date()) / (1000 * 60 * 60 * 24));

    todoItem.innerHTML = `
      <h3>${todo.title}</h3>
      <p>${todo.description}</p>
      <p>Priority: ${todo.priority}</p>
      <p>Days Left: ${daysLeft} day(s)</p>
      <div class="actions">
        <button onclick="editTodo(${index})">Edit</button>
        <button onclick="deleteTodo(${index})">Delete</button>
      </div>
    `;

    todoList.appendChild(todoItem);
  });
}

// Function to add a new to-do
function addTodo(event) {
  event.preventDefault();

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const priority = document.getElementById('priority').value;
  const dueDate = document.getElementById('due-date').value;

  // Validation: Check if all required fields are filled
  if (!title || !description || !dueDate) {
    showTooltip('Please fill in all fields!');
    return;
  }

  // Validation: Ensure the due date is not in the past
  const currentDate = new Date();
  const selectedDueDate = new Date(dueDate);
  if (selectedDueDate < currentDate) {
    showTooltip('The due date cannot be in the past. Please select a valid date.');
    return;
  }

  // Create a new to-do item and add it to the array
  todos.push({ title, description, priority, dueDate });
  renderTodos();

  todoForm.reset();
}

// Function to show tooltip with message
function showTooltip(message) {
  tooltip.textContent = message;
  tooltip.style.display = 'block';
  setTimeout(() => {
    tooltip.style.display = 'none';
  }, 3000); // Hide the tooltip after 3 seconds
}

// Function to edit a to-do item
function editTodo(index) {
  const todo = todos[index];

  document.getElementById('title').value = todo.title;
  document.getElementById('description').value = todo.description;
  document.getElementById('priority').value = todo.priority;
  document.getElementById('due-date').value = todo.dueDate;

  todos.splice(index, 1); // Remove the item from the array
  renderTodos();
}

// Function to delete a to-do item
function deleteTodo(index) {
  todos.splice(index, 1); // Remove the item from the array
  renderTodos();
}

// Function to filter todos based on search input
function filterTodos(event) {
  const searchText = event.target.value.toLowerCase();
  const filteredTodos = todos.filter(todo => 
    todo.title.toLowerCase().includes(searchText) ||
    todo.description.toLowerCase().includes(searchText)
  );
  renderTodos(filteredTodos);
}

// Add event listener to the form
todoForm.addEventListener('submit', addTodo);

// Add event listener for the search input to filter todos
searchInput.addEventListener('input', filterTodos);
