const db = require("./db");
const helper = require("../helpers");
const config = require("../config");

const User = db.model("User", {
  tableName: "users",
  idAttribute: "UserID",
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
  const users = await User.fetchPage({
    pageSize: 5,
    page: page,
    withRelated: ["rights", "role", "vehicles"],
  });

  const usersWithRights = await getUserWithRights(users);

  //   return usersWithRights;
  return {
    totalPages: users.pagination.pageCount,
    currentPage: users.pagination.page,
    data: usersWithRights,
  };
}

async function getById(id) {
  try {
    const user = await User.where("UserID", id).fetch({
      withRelated: ["rights", "role", "vehicles"],
    });
    const userWithRights = await getUserWithRights([user]);

    if (user) {
      return {
        status: 200,
        message: "User found",
        data: userWithRights[0],
      };
    } else {
      return {
        status: 404,
        message: "User not found",
        data: null,
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
}

async function create(user) {
  try {
    const newUser = await User.forge(user).save();

    if (newUser) {
      return {
        status: 200,
        message: "User created successfully",
        data: newUser.toJSON(),
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
}

async function update(id, user) {
  try {
    const updatedUser = await User.where("UserID", id).save(user, {
      patch: true,
    });
    if (updatedUser) {
      return {
        status: 200,
        message: "User updated successfully",
        data: updatedUser.toJSON(),
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
}

module.exports = {
  getMultiple,
  create,
  update,
  getById,
};
