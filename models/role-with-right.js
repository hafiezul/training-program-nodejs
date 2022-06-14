const db = require("../services/db");

const RoleWithRight = db.model("RoleWithRight", {
  tableName: "rolewithrights",
  //   role() {
  //     return this.belongsTo(Role, "RoleID", "RoleID");
  //   },
});

module.exports = RoleWithRight;
