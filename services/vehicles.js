const Vehicle = require("../models/vehicle");

async function getMultiple(page = 1) {
  const posts = await Vehicle.fetchPage({
    pageSize: 5,
    page: page,
    withRelated: ["user"],
  });
  // return posts;

  return {
    status: 200,
    message: "Posts fetched successfully",
    data: posts,
  };
}

module.exports = {
  getMultiple,
};
