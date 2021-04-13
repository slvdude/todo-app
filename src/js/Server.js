class Server {
	constructor(callbackGetTodos){
        console.log(callbackGetTodos);
        this.callbackGetTodos = callbackGetTodos || function() {};
		this.token = localStorage.getItem('token');
	}

    async getData(method, data = {}) {
        let url = `../api/?method=${method}`;
        if (this.token) {
            url += `&token=${this.token}`;
        }
        const arr = [];
        for (let key in data) {
            arr.push(`${key}=${data[key]}`);
        }
        if (arr.length) {
            url += `&${arr.join('&')}`;
        }
        const request = await fetch(url);
        const answer = await request.json();
        return (answer && answer.result == 'ok') ? answer.data : false;
    }

    async login(data) {
        const result = await this.getData('login', data);
        if (result && result.token) {
            localStorage.setItem('name', result.name);
            this.token = result.token;
            localStorage.setItem('token', this.token);
            this.getTodos();
        }
        return result;
    }

    async logout() {
        const result = await this.getData('logout');
        if(result) {
            this.token = localStorage.setItem('token', '');
            localStorage.setItem('name', '');
        }
        return result;
    }

    async registration(data) {
        const result = await this.getData('registration', data);
        if (result && result.token) {
            this.token = result.token;
        }
        return result;
    }

    makeTodo(text) {
        this.getData('makeTodo', {text});
    }

    deleteTodo(text) {
        this.getData('deleteTodo', {text});
    }

    async getTodos() {
        const data = await this.getData('getTodos');
        console.log(data);                                                                                                                                                                                                                
        this.callbackGetTodos(data);
    }
}