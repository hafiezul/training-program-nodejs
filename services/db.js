const mysql = require("mysql2/promise");
const { db } = require("../config");
const config = require("../config");

// async function query(sql, params) {
//   // const connection = await mysql.createConnection(config.db);
//   // const [results] = await connection.execute(sql, params);
//   // return results;

//   const knex = require("knex")({
//     client: "mysql",
//     connection: {
//       host: config.db.host,
//       user: config.db.user,
//       password: config.db.password,
//       database: "trainig-program-sql",
//       charset: "utf8",
//     },
//   });
//   const bookshelf = require("bookshelf")(knex);
// }

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

// module.exports = {
//   query,
// };
