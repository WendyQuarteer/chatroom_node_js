let socket = io.connect();//define your socket

const form = document.getElementById("chatForm");//store the form in a variable
const target = document.getElementById("allMessages")//store the target in a variable

form.addEventListener('submit', (event) => {//when a button is clicked
    event.preventDefault();//prevent the page from reloading

    const input =  document.getElementById('input')//store the input in a variable
    const message = input.value;
    console.log(message)

    socket.emit('form', message);//do an emit to the server


})
socket.on('displayMessage', (message) => {//receive the message back from the server.
    target.innerHTML += '<li>'+ message + '</li>';
});






