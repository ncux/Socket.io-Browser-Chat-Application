// chat.js is for the client side

// make connection to server
const Socket = io.connect('http://localhost:3000');

// query the DOM
const handle = document.querySelector('#handle');
const message = document.querySelector('#message');
const sendButton = document.querySelector('#send');
const output = document.querySelector('#output');
const feedback = document.querySelector('#feedback');

// emit event on  send click
sendButton.addEventListener('click', e => Socket.emit('chat', { message: message.value, handle: handle.value }));

// listen for server emissions
Socket.on('chat', data => {
    feedback.innerHTML = '';    // clear feedback (part of the optional features)
    output.innerHTML += '<p><strong>' + data.handle + ':' + '</strong>' + ' ' + data.message + '</p>';
    message.value = '';        // clear the message input
});

// optional features

// listen for keypress on message input
message.addEventListener('keypress', e => Socket.emit('typing', handle.value));

// listen for server emission of typing event
Socket.on('typing', data => feedback.innerHTML += '<p><em>' + data + '</em>' + ' ' + 'is typing...</p>');


