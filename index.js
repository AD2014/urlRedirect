'use strict';

var babel = require("babel-core");

import express from "express";
import bodyParser from "body-parser";
import { PORT, SERVER_NAME } from "./CONFIG/properties";
import { Client } from "./app/database/db";

const client = Client.connect();
const app = express();

const LISTENING_PORT = PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//API
import { controllerUrl } from './app/url/index'
app.post('/v1/url/:url', controllerUrl.create);


const ServerListening = (req, res, next) => {
    console.log(SERVER_NAME + " [listening on port: " + LISTENING_PORT + "].");
};


const server = app.listen(LISTENING_PORT, ServerListening);


process.on( 'SIGINT', () => {
  if (server) {
    console.log('Shutting down server');
    server.close();
  }
  if (server) {
    console.log('Shutting down connection with postgres');
    Client.end();
  }
  return process.exit();
});
