'use strict';

var babel = require("babel-core");

import express from "express";
import { PORT, SERVER_NAME } from "./app/properties";
import { connect } from "./app/db"
// const db = connect();
const app = express();

const LISTENING_PORT = process.env.PORT || PORT;

const ServerListening = (req, res, next) => {
    console.log(SERVER_NAME + " [listening on port: " + LISTENING_PORT + "].");
};

const server = app.listen(LISTENING_PORT, ServerListening);
