import { io } from "socket.io-client";

const BOARD_ID = "6a3cb9cff72fb7bfb1f30ea3";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  socket.emit("join-board", BOARD_ID);

  console.log("Joined board:", BOARD_ID);
});

socket.on("member-added", (data) => {
  console.log("Member Added:");
  console.log(data);
});

socket.on("board-updated", (data) => {
  console.log("Board Updated:");
  console.log(data);
});

socket.on("card-created", (data) => {
  console.log("Card Created:");
  console.log(data);
});

socket.on("card-updated", (data) => {
  console.log("Card Updated:");
  console.log(data);
});

socket.on("card-moved", (data) => {
  console.log("Card Moved:");
  console.log(data);
});

socket.on("card-deleted", (data) => {
  console.log("Card Deleted:");
  console.log(data);
});