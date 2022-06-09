const db = require("./db");
const helper = require("../helpers");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM users 
        INNER JOIN role ON users.RoleID = role.RoleID
        INNER JOIN rolewithrights ON role.RoleID = rolewithrights.RoleID
        INNER JOIN rights ON rolewithrights.RightsID = rights.RightsID
        LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  //   structure data so that user can be merged and will have multiple rights
  const users = data.reduce((acc, user) => {
    if (!acc[user.UserID]) {
      acc[user.UserID] = {
        UserID: user.UserID,
        Username: user.Username,
        Role: user.Role,
        Rights: [],
      };
    }
    acc[user.UserID].Rights.push(user.UserRight);
    return acc;
  }, {});

  return { users, meta };
}

async function create(user) {
  const result = await db.query(
    `INSERT INTO users (Mailadresse, Password, RoleID) VALUES ('${user.Mailadresse}', '${user.Password}', '${user.RoleID}')`
  );

  let message = "Error";

  if (result.affectedRows) {
    message = "User created successfully";
    //   get created user
    result.createdUser = await db.query(
      `SELECT * FROM users WHERE UserID = '${result.insertId}'`
    );
  }

  return { message, result };
}

module.exports = {
  getMultiple,
  create,
};
