document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const date = document.getElementById('todo-date');
  const list = document.getElementById('todo-list');
  const filterDate = document.getElementById('filter-date');

  let todos = [];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = input.value.trim();
    const dueDate = date.value;

    if (!task || !dueDate) {
      alert("Both task and date are required!");
      return;
    }

    const todo = { id: Date.now(), task, dueDate };
    todos.push(todo);
    renderTodos();
    form.reset();
  });

  filterDate.addEventListener('change', () => {
    renderTodos();
  });

  function renderTodos() {
    list.innerHTML = '';
    const filter = filterDate.value;

    const filteredTodos = filter
      ? todos.filter(todo => todo.dueDate === filter)
      : todos;

    filteredTodos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = \`\${todo.task} - \${todo.dueDate}\`;

      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.style.backgroundColor = '#dc3545';
      delBtn.style.color = 'white';
      delBtn.style.border = 'none';
      delBtn.style.cursor = 'pointer';
      delBtn.onclick = () => {
        todos = todos.filter(t => t.id !== todo.id);
        renderTodos();
      };

      li.appendChild(delBtn);
      list.appendChild(li);
    });
  }
});
