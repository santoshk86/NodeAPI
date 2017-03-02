import * as http from "http";
import * as debug from "debug";

import App from "./App";

debug("ts-express:server");

// tslint:disable-next-line:typedef
const port = normalizePort(process.env.PORT || 3000);
App.set("port", port);

// tslint:disable-next-line:typedef
const server = http.createServer(App);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val: number|string): number|string|boolean {
  let port: number = (typeof val === "string") ? parseInt(val, 10) : val;
  // tslint:disable-next-line:curly
  if (isNaN(port)) return val;
  // tslint:disable-next-line:curly
  else if (port >= 0) return port;
  // tslint:disable-next-line:curly
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  // tslint:disable-next-line:curly
  if (error.syscall !== "listen") throw error;
  // tslint:disable-next-line:typedef
  let bind = (typeof port === "string") ? "Pipe " + port : "Port " + port;
  switch(error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  // tslint:disable-next-line:typedef
  let addr = server.address();
  // tslint:disable-next-line:typedef
  let bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}