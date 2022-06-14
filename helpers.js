function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

function response(status, message, data) {
  return {
    totalPages,
    data,
  };
}

module.exports = {
  getOffset,
  emptyOrRows,
  response,
};
