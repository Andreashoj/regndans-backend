require("dotenv").config();
const path = require("path");
const knex = require("knex")({
  client: process.env.CLIENT,
  connection: {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASS,
      database: process.env.DB
  },
  migrations: {
    directory: path.resolve("../migrations"),
  },
});

module.exports = knex;