const Vehicle = require("../models/vehicle");

async function getMultiple(page = 1) {
  const posts = await Vehicle.fetchPage({
    pageSize: 5,
    page: page,
    withRelated: ["user"],
  });

  return {
    totalPages: posts.pagination.pageCount,
    currentPage: posts.pagination.page,
    data: posts,
  };
}

async function create(data) {
  try {
    const vehicle = await Vehicle.forge(data).save();

    if (vehicle) {
      return {
        status: 200,
        message: "Vehicle created successfully",
        data: vehicle,
      };
    } else {
      return {
        status: 404,
        message: "Vehicle not created",
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

async function getByUserId(userId, page = 1) {
  const vehicles = await Vehicle.where("UserID", userId).fetchPage({
    pageSize: 5,
    page: page,
    withRelated: ["user"],
  });

  return {
    status: 200,
    message: "Vehicles fetched successfully",
    data: vehicles,
  };
}

module.exports = {
  getMultiple,
  create,
  getByUserId,
};
