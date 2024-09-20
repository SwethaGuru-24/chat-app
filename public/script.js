const socket = io();

// Listen for messages from the server
socket.on('message', message => {
    outputMessage(message);
});

// Handle message submit
const chatForm = document.getElementById('chat-form');
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;

    // Emit message to server
    socket.emit('chatMessage', msg);

    // Clear input
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
