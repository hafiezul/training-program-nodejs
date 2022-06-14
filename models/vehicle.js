const db = require("../services/db");
const User = require("./user");

const Vehicle = db.model("Vehicle", {
  tableName: "vehicles",
  idAttribute: "VehicleID",
  user() {
    return this.belongsTo(User, "UserID", "UserID");
  },
});

module.exports = Vehicle;
