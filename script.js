document.addEventListener('DOMContentLoaded', () => {
  // Ambil elemen dari HTML
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const date = document.getElementById('todo-date');
  const list = document.getElementById('todo-list');
  const filterDate = document.getElementById('filter-date');

  // Simpan semua to-do di array
  let todos = [];

  // Saat form disubmit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const task = input.value.trim();
    const dueDate = date.value;

    // Validasi input
    if (!task || !dueDate) {
      alert("Both task and date are required!");
      return;
    }

    // Buat objek todo dan tambahkan ke array
    const todo = {
      id: Date.now(),
      task: task,
      dueDate: dueDate
    };

    todos.push(todo);
    renderTodos();
    form.reset();
  });

  // Saat filter diubah
  filterDate.addEventListener('change', () => {
    renderTodos();
  });

  // Render daftar todo
  function renderTodos() {
    list.innerHTML = '';

    const filter = filterDate.value;
    const filteredTodos = filter
      ? todos.filter(todo => todo.dueDate === filter)
      : todos;

    filteredTodos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = `${todo.task} - ${todo.dueDate}`;

      // Buat tombol hapus
      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.onclick = () => {
        todos = todos.filter(t => t.id !== todo.id);
        renderTodos();
      };

      li.appendChild(delBtn);
      list.appendChild(li);
    });
  }
});
