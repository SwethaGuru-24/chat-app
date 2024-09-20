const socket = io();

socket.on('message', message => {
    outputMessage(message);
});

const chatForm = document.getElementById('chat-form');
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg);
  
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Output message to the chat window
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerText = message;
    document.getElementById('messages').appendChild(div);
}
