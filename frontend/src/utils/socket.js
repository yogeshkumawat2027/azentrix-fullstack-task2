import { io } from "socket.io-client";

const socket = io("https://azentrix-fullstack-task2-w51b.onrender.com", {
  withCredentials: true,
  autoConnect: false,
});

export default socket;