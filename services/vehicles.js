const User = db.model("User", {
  tableName: "users",
  vehicles() {
    return this.hasMany(Vehicles, "UserID");
  },
  roles() {
    return this.belongsTo(Role, "RoleID");
  },
});

const Vehicles = db.model("Vehicles", {
  tableName: "vehicles",
  user() {
    return this.belongsTo(User, "UserID", "UserID");
  },
});

// const posts = await Vehicles.fetchAll({
//   withRelated: ["user"],
// });
// return posts;
