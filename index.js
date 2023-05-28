'use strict';

require('dotenv').config();
const { db } = require('./src/auth/models/index.js');
const server = require('./src/server.js');
const PORT = process.env.PORT;

db.sync({ force: true })
  .then(() => {
    server.start(PORT);
  });

