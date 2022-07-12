const userCollection = require("../models/user");

const get = (pageNo, limit) => {
  return userCollection
    .find({ role: 2, isDeleted: false })
    .skip(parseInt(pageNo - 1) * limit)
    .limit(limit)
    .sort({ _id: -1 });
};
const update = (condition, payload) => {
  return userCollection.findByIdAndUpdate(condition, payload);
};
const updatestatus = (condition, payload) => {
  return userCollection.updateOne(condition, payload);
};
const findEmail = (condition) => userCollection.findOne(condition);
const findOne = (condition) => userCollection.findById(condition);
const getUsersBySearch = (text) => {
  return userCollection.aggregate([
    {
      $match: {
        $and: [
          {
            $or: [
              { firstName: { $regex: String(text), $options: "i" } },
              { bussName: { $regex: String(text), $options: "i" } },
              { email: { $regex: String(text), $options: "i" } },
            ],
          },
          { isDeleted: false },
          { role: 2 },
        ],
      },
    },
  ]);
};

const remove = (condition) => userCollection.findByIdAndDelete(condition);
const post = (payload) => userCollection.create(payload);
const getAllUser = () => {
  return userCollection.find({ role: 2, isDeleted: false });
};

module.exports = {
  get,
  remove,
  update,
  findOne,
  getUsersBySearch,
  updatestatus,
  findEmail,
  post,
  getAllUser,
};
