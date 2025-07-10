document.addEventListener('DOMContentLoaded', () => {

    // Memilih elemen-elemen penting dari HTML
    const taskInput = document.getElementById('task-input');
    const dateInput = document.getElementById('date-input');
    const addButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');
    const startDateFilter = document.getElementById('start-date-filter');
    const endDateFilter = document.getElementById('end-date-filter');
    const filterButton = document.getElementById('filter-button');
    const resetFilterButton = document.getElementById('reset-filter-button');

    // Fungsi untuk memformat tanggal ke format YYYY-MM-DD
    function formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
    
    // Fungsi untuk menambah tugas baru
    function addTask() {
        const taskText = taskInput.value.trim();
        const taskDate = dateInput.value;

        if (taskText === '') {
            alert('Tugas tidak boleh kosong!');
            return;
        }

        const li = document.createElement('li');
        // Simpan tanggal dalam atribut data-date untuk filtering
        li.dataset.date = taskDate; 

        // Tampilkan tanggal yang mudah dibaca atau pesan jika tidak ada tanggal
        const displayDate = taskDate ? new Date(taskDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Tanpa batas waktu';

        li.innerHTML = `
            <div class="task-content">
                <p>${taskText}</p>
                <span class="task-date">${displayDate}</span>
            </div>
            <span class="delete-btn">×</span>
        `;
        
        taskList.appendChild(li);

        taskInput.value = '';
        dateInput.value = ''; // Kosongkan juga input tanggal

        saveData();
    }

    // Menangani interaksi pada daftar tugas
    function handleTaskListClick(event) {
        const target = event.target;
        const li = target.closest('li');

        if (!li) return; // Jika klik di luar item list, abaikan

        if (target.classList.contains('delete-btn')) {
            li.remove();
        } else {
            // Toggle status selesai pada elemen li
            li.classList.toggle('checked');
        }
        saveData();
    }

    // Fungsi untuk memfilter tugas berdasarkan rentang tanggal
    function filterTasks() {
        const startDate = startDateFilter.value;
        const endDate = endDateFilter.value;

        // Jika tanggal awal lebih besar dari tanggal akhir, beri peringatan
        if (startDate && endDate && startDate > endDate) {
            alert("Tanggal Awal tidak boleh lebih besar dari Tanggal Akhir!");
            return;
        }

        const tasks = taskList.querySelectorAll('li');

        tasks.forEach(task => {
            const taskDate = task.dataset.date;
            let showTask = true; // Defaultnya tampilkan semua tugas

            // Logika filter
            if (taskDate && startDate && taskDate < startDate) {
                showTask = false;
            }
            if (taskDate && endDate && taskDate > endDate) {
                showTask = false;
            }
            // Jika filter diisi tapi tugas tidak punya tanggal, sembunyikan
            if (!taskDate && (startDate || endDate)) {
                showTask = false;
            }

            task.style.display = showTask ? 'flex' : 'none';
        });
    }
    
    // Fungsi untuk mereset filter dan menampilkan semua tugas
    function resetFilter() {
        startDateFilter.value = '';
        endDateFilter.value = '';
        const tasks = taskList.querySelectorAll('li');
        tasks.forEach(task => {
            task.style.display = 'flex';
        });
    }

    // Fungsi untuk menyimpan data ke localStorage
    function saveData() {
        localStorage.setItem('todoListData', taskList.innerHTML);
    }

    // Fungsi untuk memuat data dari localStorage
    function loadData() {
        const data = localStorage.getItem('todoListData');
        if (data) {
            taskList.innerHTML = data;
        }
    }

    // Menambahkan event listener
    addButton.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskListClick);
    filterButton.addEventListener('click', filterTasks);
    resetFilterButton.addEventListener('click', resetFilter);

    taskInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Panggil fungsi loadData saat pertama kali halaman dimuat
    loadData();
});