const config = require("../config");
const fs = require("fs");

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    charset: "utf8",
  },
});

module.exports = require("bookshelf")(knex);
