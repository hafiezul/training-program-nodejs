const express = require("express");
const router = express.Router();
const users = require("../services/users");

/*
 * GET /api/users
 * Get all users, roles and rights
 * @returns {Array}
 * @throws {Error}
 */
router.get("/", async function (req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error : `, err.message);
    next(err);
  }
});

/*
 * POST /api/users
 * Create a new user
 * @returns {Object}
 * @throws {Error}
 * TODO: Add validation for user creation
 * TODO: Hash password
 */
router.post("/", async function (req, res, next) {
  try {
    res.json(await users.create(req.body));
  } catch (err) {
    console.error(`Error: `, err.message);
    next(err);
  }
});

module.exports = router;
