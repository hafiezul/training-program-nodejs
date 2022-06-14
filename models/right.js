const db = require("../services/db");

const Right = db.model("Right", {
  tableName: "rights",
});

module.exports = Right;
