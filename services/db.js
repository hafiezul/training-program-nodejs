const config = require("../config");
const fs = require("fs");
const cascade = require("bookshelf-cascade-delete");

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

const bookshelf = (module.exports = require("bookshelf")(knex));
bookshelf.plugin(cascade);
