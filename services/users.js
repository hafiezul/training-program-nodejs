const db = require("./db");
const helper = require("../helpers");
const config = require("../config");

const User = db.model("User", {
  tableName: "users",
  vehicles() {
    return this.hasMany(Vehicles, "UserID", "UserID");
  },
  role() {
    return this.belongsTo(Role, "RoleID", "RoleID");
  },
  // get rights.UserRight for user using roleID using rolewithrights
  rights() {
    return this.hasMany(RoleWithRights, "RoleID", "RoleID");
  },
});

// Get roles with and has many rights
const RoleWithRights = db.model("RoleWithRights", {
  tableName: "rolewithrights",
  role() {
    return this.belongsTo(Role, "RoleID", "RoleID");
  },
});

const Role = db.model("Role", {
  tableName: "role",
});

const Rights = db.model("Rights", {
  tableName: "rights",
});

const Vehicles = db.model("Vehicles", {
  tableName: "vehicles",
  user() {
    return this.belongsTo(User, "UserID", "UserID");
  },
});

const getRightName = async (rightsID) => {
  const right = await Rights.where("RightsID", rightsID).fetch();
  return right.get("UserRight");
};

async function getUserWithRights(users) {
  const usersWithRights = Promise.all(
    users.map(async (user) => {
      const rights = await Promise.all(
        user.toJSON().rights.map((right) => {
          return getRightName(right.RightsID);
        })
      );
      return {
        ...user.toJSON(),
        rights,
      };
    })
  );

  return usersWithRights;
}

async function getMultiple(page = 1) {
  const users = await User.fetchAll({
    withRelated: ["rights", "role", "vehicles"],
  });

  const usersWithRights = await getUserWithRights(users);

  return usersWithRights;
}

async function create(user) {}

module.exports = {
  getMultiple,
  create,
};
