'use strict';

// 3rd Party Resources
// require('dotenv').config();
const express = require('express');
const cors = require('cors');

const errorHandler = require('./middleware/500.js');
const notFound = require('./middleware/404.js');
const authRouter = require('./auth/router.js');
// Prepare the express app
const app = express();
app.use(cors());

// Process FORM intput and put the data on req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);

app.use(notFound);
app.use(errorHandler);

module.exports={
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`server is listening on ${port}`);
    });
  },
};