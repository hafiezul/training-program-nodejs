const db = require("./db");

// const User = db.model("User", {
//   tableName: "users",
//   vehicles() {
//     return this.hasMany(Vehicles, "UserID");
//   },
//   roles() {
//     return this.belongsTo(Role, "RoleID");
//   },
// });

const Vehicles = db.model("Vehicles", {
  tableName: "vehicles",
  user() {
    return this.belongsTo(User, "UserID", "UserID");
  },
});

async function getMultiple(page = 1) {
  const posts = await Vehicles.fetchPage({
    pageSize: 5,
    page: page,
    withRelated: ["user"],
  });
  // return posts;

  return {
    status: 200,
    message: "Posts fetched successfully",
    data: posts,
  };
}

module.exports = {
  getMultiple,
};
