const db = require("../services/db");

const RoleWithRight = require("./role-with-right");
const Role = require("./role");
const Vehicle = require("./vehicle");

const User = db.model(
  "User",
  {
    tableName: "users",
    idAttribute: "UserID",
    vehicles() {
      return this.hasMany(Vehicle, "UserID", "UserID");
    },
    role() {
      return this.belongsTo(Role, "RoleID", "RoleID");
    },
    // get rights.UserRight for user using roleID using rolewithrights
    rights() {
      return this.hasMany(RoleWithRight, "RoleID", "RoleID");
    },
  },
  {
    dependents: ["vehicles"],
  }
);

module.exports = User;
