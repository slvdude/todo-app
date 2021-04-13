const server = new Server(callbackGetTodos);

function setFormMessage(formElement, type, message) {
    const messageElement = formElement. querySelector(".form__message");
    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = '';
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function callbackGetTodos(note) {
    console.log(note);
    if(note) {
        note.forEach(note => {
            const todoDiv = document.createElement('div');
            //Div
            todoDiv.classList.add("todo");
            //li
            const newTodo = document.createElement('li');
            newTodo.innerText = `${note.note}`;
            newTodo.classList.add('todo_item');
            todoDiv.appendChild(newTodo);
            //кнопка удалить todo
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteButton.classList.add('delete_button');
            todoDiv.appendChild(deleteButton);
            todoList.appendChild(todoDiv);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const greetName = document.querySelector(".greet_name");
    const mainPage = document.querySelector(".main");
    const authPage = document.querySelector(".auth");
    const loginForm = document.querySelector("#login");
    const regForm = document.querySelector("#registration");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        regForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        regForm.classList.add("form--hidden");
        loginForm.classList.remove("form--hidden");
    });

    regForm.addEventListener("submit", async e => {
        e.preventDefault();
        //ЗАПРОС fetch/ajax
        const name = document.getElementById('signup__username').value;
        const login = document.getElementById('signup__login').value;
        const password = document.getElementById('signup__password').value;
        const result = await server.registration({name, login, password});
        console.log('регистрация');
        if (result) { // регистрация и логин успешные, войти в игру
            console.log('Зарегался');
            authPage.style.display = "none";  
            mainPage.style.display = "block";
            greetName.innerText = `Привет, ${localStorage.name}`;          
        } else { // показать сообщение об ошибке
            console.log('error');
        }  
    });

    loginForm.addEventListener("submit", async e => {
        e.preventDefault();
        //ЗАПРОС fetch/ajax
        const login = document.getElementById('signin_login').value;
        const password = document.getElementById('signin__password').value;
        const result = await server.login({ login, password });
        console.log('вход');
        if (result) {
            console.log("вошёл"); 
            authPage.style.display = "none";  
            mainPage.style.display = "block";
            greetName.innerText = `Привет, ${localStorage.name}`;
        } else {
            setFormMessage(loginForm, "error", "Неправильный логин/пароль");
        }
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if(e.target.id === "signup__username" && e.target.value.length >= 0 && e.target.value.length < 5) {
                setInputError(inputElement, "Имя пользователя должно содержать не менее 4 символов!");               
            }
            if(e.target.id === "signup__login" && e.target.value.length >= 0 && e.target.value.length < 8) {
                setInputError(inputElement, "Логин должен быть не менее 8 символов!");
            }
            if(e.target.id === "signup__password" && e.target.value.length >= 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Пароль должен содержать не менее 10 символов!");
            }
        });
        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});