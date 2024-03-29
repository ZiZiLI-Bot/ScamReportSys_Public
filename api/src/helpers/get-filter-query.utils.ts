const excludeFields = ['page', 'limit', 'sort', 'sortBy'];
const getFilterQuery = (query: { [key: string]: any }) => {
  excludeFields.forEach((field) => delete query[field]);
  let queryStr = JSON.stringify(query);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  return JSON.parse(queryStr);
};

export { getFilterQuery };
