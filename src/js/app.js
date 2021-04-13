//const appServer = new Server(callbackGetTodos);
const menuIcon = document.querySelector('.hamburger_menu');
const navbar = document.querySelector('.navbar');
const exitBtn = document.getElementById("exit");
const mainPage = document.querySelector('.main');
const authPage = document.querySelector(".auth");
const todoInput = document.querySelector('.todo_input');
const todoButton = document.querySelector('.todo_btn');
const todoList = document.querySelector('.todo_list');
const profilePage = document.querySelector('.profile');
const profileLink = document.getElementById("profile");
const profileName = document.querySelector('.profile_name');
const backButton = document.querySelector('.back');

backButton.addEventListener("click", () => {
    profilePage.style.display = "none";
    mainPage.style.display = "block";
});

profileLink.addEventListener("click", () => {
    mainPage.style.display = "none";
    profilePage.style.display = "block";
    profileName.innerText = `${localStorage.name}`;
});
 
menuIcon.addEventListener("click", () => {
    navbar.classList.toggle('change');
});

exitBtn.addEventListener("click", async () => {
    const result = await server.logout();
    if(result) {
        mainPage.style.display = "none";
        authPage.style.display = "block";
        window.location.reload();
    }
});

todoButton.addEventListener('click', makeTodo);
todoList.addEventListener('click', deleteTodo);

function makeTodo(event) {
    event.preventDefault();
    const text = todoInput.value;
    if (text) {
        console.log(text);
        server.makeTodo(text);
        const todoDiv = document.createElement('div');
        //Div
        todoDiv.classList.add("todo");
        //li
        const newTodo = document.createElement('li');
        newTodo.innerText = text;
        newTodo.classList.add('todo_item');
        todoDiv.appendChild(newTodo);
        //кнопка удалить todo
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.classList.add('delete_button');
        todoDiv.appendChild(deleteButton);
        todoList.appendChild(todoDiv);
        todoInput.value = '';
    }
}

function deleteTodo(e) {
    const item = e.target;
    if(item.classList[0] === 'delete_button') {
        const todo = item.parentElement;
        const text = todo.innerText;
        todo.classList.add('fall');
        todo.addEventListener("transitionend", () => {
            server.deleteTodo(text);
            todo.remove();
        });
    }
}


