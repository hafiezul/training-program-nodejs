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

module.exports = router;
