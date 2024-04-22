import type { ServerWebSocket } from "bun";
import * as M from "duck-fp/maybe";

const findUserByConnection = (users: User[], ws: ServerWebSocket<unknown>) =>
  M.fromNullable(users.find((user) => user.connection === ws));
const getUserName = (user: User) => user.name;

interface User {
  name: string;
  connection: ServerWebSocket<unknown>;
}

const sockets: User[] = [];

Bun.serve({
  port: 8000,
  fetch(req, server) {
    server.upgrade(req, {});
  },
  websocket: {
    open(ws) {
      console.log("open");

      sockets.push({
        name: `User ${sockets.length}`,
        connection: ws,
      });
    },

    message(ws, message) {
      const user = findUserByConnection(sockets, ws).map(getUserName);

      sockets.map((socket) => {
        socket.connection.send(
          JSON.stringify({
            from: "",
          }),
        );
      });
    },
  },
});
