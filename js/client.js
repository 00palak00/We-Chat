const socket = io("http://localhost:8002");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
var audio = new Audio("me-too-603.mp3");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = message;
  if (position != "middle") messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left") audio.play();
};

form.addEventListener("submit", (e) => {
  e.preventDefault(); // page will not be reloaded
  const message = messageInput.value;
  append(`<b>You</b>: ${message}`, `right`);
  socket.emit("send", message);
  messageInput.value = "";
});

const name = prompt("enter your name to join");
socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  append(`<b>${name}</b> joined`, `middle`);
});

socket.on("recieve", (data) => {
  append(`<b>${data.name}</b>: ${data.message}`, `left`);
});

socket.on("left", (name) => {
  append(`<b>${name}</b> left`, `middle`);
});
