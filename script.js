document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
                <button class="edit-btn"><i class="fas fa-edit"></i></button>
                <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
            `;

            const checkbox = li.querySelector('input[type="checkbox"]');
            const todoText = li.querySelector('.todo-text');
            const editBtn = li.querySelector('.edit-btn');
            const deleteBtn = li.querySelector('.delete-btn');

            checkbox.addEventListener('change', () => {
                todo.completed = checkbox.checked;
                todoText.classList.toggle('completed');
                saveTodos();
            });

            editBtn.addEventListener('click', () => {
                const newText = prompt('Edit task:', todo.text);
                if (newText !== null && newText.trim() !== '') {
                    todo.text = newText.trim();
                    todoText.textContent = newText.trim();
                    saveTodos();
                }
            });

            deleteBtn.addEventListener('click', () => {
                li.style.animation = 'fadeOut 0.3s ease';
                li.addEventListener('animationend', () => {
                    todos.splice(index, 1);
                    renderTodos();
                    saveTodos();
                });
            });

            todoList.appendChild(li);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoText = input.value.trim();
        if (todoText !== '') {
            todos.push({ text: todoText, completed: false });
            input.value = '';
            renderTodos();
            saveTodos();
            
            const newTodo = todoList.lastElementChild;
            newTodo.style.animation = 'fadeIn 0.5s ease';
        }
    });

    renderTodos();
});