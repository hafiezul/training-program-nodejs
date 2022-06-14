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
    page: vehicles.pagination.page,
    totalPages: vehicles.pagination.pageCount,
    data: vehicles,
  };
}

async function getById(id) {
  try {
    const vehicle = await Vehicle.where("VehicleID", id).fetch({
      withRelated: ["user"],
    });

    if (vehicle) {
      return {
        status: 200,
        message: "Vehicle found",
        data: vehicle,
      };
    } else {
      return {
        status: 404,
        message: "Vehicle not found",
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

async function update(id, vehicle) {
  try {
    const updatedVehicle = await Vehicle.where("VehicleID", id).save(vehicle, {
      patch: true,
    });

    if (updatedVehicle) {
      return {
        status: 200,
        message: "Vehicle updated successfully",
        data: updatedVehicle,
      };
    } else {
      return {
        status: 404,
        message: "Vehicle not updated",
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

async function deleteVehicle(id) {
  try {
    const vehicle = await Vehicle.where("VehicleID", id).destroy();

    if (vehicle) {
      return {
        status: 200,
        message: "Vehicle deleted successfully",
        data: vehicle,
      };
    } else {
      return {
        status: 404,
        message: "Vehicle not deleted",
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

module.exports = {
  getMultiple,
  create,
  getByUserId,
  getById,
  update,
  deleteVehicle,
};
