const db = require("../services/db");

const Role = db.model("Role", {
  tableName: "roles",
  //   idAttribute: "RoleID",
  rights() {
    return this.hasMany("RoleWithRight", "RoleID", "RoleID");
  },
});

module.exports = Role;
