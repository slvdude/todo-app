const inputText = document.querySelector('.todo_input');
const recordBtn = document.getElementById('record_btn');
const stopBtn = document.getElementById('stop_btn');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();

recognition.interimResults = true;

recognition.addEventListener('result', (e) => {
    console.log(e.results);
    const text = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
    console.log(text);
    inputText.value = text;
});

recordBtn.addEventListener("click", (e) => {
    e.preventDefault();
    recognition.start();
});

stopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    recognition.stop();
});

