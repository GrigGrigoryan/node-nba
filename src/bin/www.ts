#!/usr/bin/env node

/**
 * Module dependencies.
 */

import 'dotenv/config';
import http from 'http';
import app from '../app';
import { Server as httpServer } from 'http';
import { ErrorCode } from "../common/enums";
import { AddressInfo } from "net";

/**
 * Create HTTP/HTTPS server.
 */

let server: httpServer;

server = http.createServer(app);

/**
 * Get port from environment and store in Express.
 */

const port: string | number | boolean = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

process
  .on('unhandledRejection', (reason: {}, p: any) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', (err: Error) => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const portNum: string | number | boolean = parseInt(val, 10);

  if (isNaN(portNum)) {
    // named pipe
    return val;
  }

  if (portNum >= 0) {
    // port number
    return portNum;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: { syscall: string; code: string }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind: string = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case ErrorCode.EACCESS:
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case ErrorCode.EADDRINUSE:
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr: string | AddressInfo = server.address();
  const bind: string = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
