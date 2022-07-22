let socket = io.connect();//define your socket

const target = document.getElementById("allMessages");//store the target in a variable
const toAll = document.getElementById("toAll");
const toMe = document.getElementById("toMe");

//SIGN-IN USER
const username = window.prompt("Enter the username");
socket.emit('newUser', username);


//FUNCTION FOR WHEN TO-ALL-BUTTON IS CLICKED:
toAll.addEventListener('click', (event) => {
//event.preventDefault() = prevent the page from reloading -> only for form!
    const input =  document.getElementById('input')//store the input in a variable
    const message = input.value;
    socket.emit('toAll', message);//do an emit to the server
})

//FUNCTION FOR WHEN TO-ME-BUTTON IS CLICKED
toMe.addEventListener('click', (event) => {//when a button is clicked
    //event.preventDefault();//prevent the page from reloading - only for form!
    const input =  document.getElementById('input')//store the input in a variable
    const message = input.value;
    socket.emit('toMe', message);//do an emit to the server
})

socket.on('displayMessage', (message) => {//receive the message back from the server.
    target.innerHTML += '<li>'+ message + '</li>';
});

socket.on('active', (activeUsers) => {
    document.getElementById('allActive').innerHTML = '';
    document.getElementById('allActive').innerHTML += '<li>'+ activeUsers + '</li>';
});





