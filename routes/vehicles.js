const express = require("express");
const router = express.Router();

const vehicles = require("../services/vehicles");

/*
 * GET /api/vehicles
 * Get all vehicles
 * @returns {Array}
 * @throws {Error}
 */
router.get("/", async function (req, res, next) {
  try {
    res.json(await vehicles.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error : `, err.message);
    next(err);
  }
});

/*
 * GET /api/vehicles/user/:id
 * Get all vehicles by userId
 * @param {Number} id
 * @param {Number} page
 * @returns {Array}
 * @throws {Error}
 */
router.get("/user/:id", async function (req, res, next) {
  try {
    res.json(await vehicles.getByUserId(req.params.id, req.query.page));
  } catch (err) {
    console.error(`Error : `, err.message);
    next(err);
  }
});

/*
 * GET /api/vehicles/:id
 * Get a vehicle by id
 * @returns {Object}
 * @throws {Error}
 * @param {Number} id
 */
router.get("/:id", async function (req, res, next) {
  try {
    res.json(await vehicles.getById(req.params.id));
  } catch (err) {
    console.error(`Error : `, err.message);
    next(err);
  }
});

/*
 * POST /api/vehicles
 * Create a new vehicle
 * @returns {Object}
 * @throws {Error}
 * @body {Object}
 */
router.post("/", async function (req, res, next) {
  try {
    res.json(await vehicles.create(req.body));
  } catch (err) {
    console.error(`Error : `, err.message);
    next(err);
  }
});

/*
 * PUT /api/vehicles/:id
 * Update a vehicle
 * @returns {Object}
 * @throws {Error}
 * @body {Object}
 * @param {Number} id
 */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await vehicles.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error : `, err.message);
    next(err);
  }
});

/*
 * DELETE /api/vehicles/:id
 * Delete a vehicle
 * @returns {Object}
 * @throws {Error}
 * @param {Number} id
 */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await vehicles.deleteVehicle(req.params.id));
  } catch (err) {
    console.error(`Error : `, err.message);
    next(err);
  }
});

module.exports = router;
