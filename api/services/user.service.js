const userCollection = require("../models/user");

const post = (payload) => userCollection.create(payload);
const getUserWithPagination = (pageNo, limit) => {
  return userCollection
    .find({ role: 3, isDeleted: false })
    .skip(parseInt(pageNo - 1) * limit)
    .limit(limit)
    .sort({ _id: -1 });
};

const getUserBySearch = (text) => {
  return userCollection.aggregate([
    {
      $match: {
        $and: [
          {
            $or: [{ firstName: { $regex: String(text), $options: "i" } }],
          },
          { isDeleted: false },
        ],
      },
    },
  ]);
};
const update = (condition, payload) =>
  userCollection.findByIdAndUpdate(condition, payload);
const loginStatusUpdate = (condition, payload) => {
  return userCollection.findByIdAndUpdate(condition, payload);
};
module.exports = {
  post,
  getUserWithPagination,
  update,
  getUserBySearch,
  loginStatusUpdate,
};
