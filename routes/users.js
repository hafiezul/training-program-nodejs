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
 * GET /api/users/:id
 * Get user by id
 * @returns {Object}
 * @throws {Error}
 * @param {Number} id
 */
router.get("/:id", async function (req, res, next) {
  try {
    res.json(await users.getById(req.params.id));
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

/*
 * PUT /api/users/:id
 * Update a user
 * @returns {Object}
 * @throws {Error}
 * TODO: Add validation for user update
 * TODO: Hash password
 */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await users.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error: `, err.message);
    next(err);
  }
});

/*
 * DELETE /api/users/:id
 * Delete a user and all associated data (vehicles, roles, rights)
 * @returns {Object}
 * @throws {Error}
 * @param {Number} id
 */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await users.deleteUser(req.params.id));
  } catch (err) {
    console.error(`Error: `, err.message);
    next(err);
  }
});

module.exports = router;
