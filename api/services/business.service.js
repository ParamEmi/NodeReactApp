const businessCollection = require("../models/business");

const post = (payload) => businessCollection.create(payload);
const getAll = () => businessCollection.find({ isDeleted: false });
const remove = (id) =>
  businessCollection.findByIdAndUpdate(id, { isDeleted: true });
const update = (condition, payload, obj) =>
  businessCollection.findByIdAndUpdate(condition, payload, obj);
const getAllPagination = (pageNo, limit) => {
  return businessCollection
    .find({ isDeleted: false })
    .skip(parseInt(pageNo - 1) * limit)
    .limit(limit)
    .sort({ _id: -1 });
};

const search = (pageNo, limit, text) => {
  return businessCollection
    .find({
      $or: [{ businessType: { $regex: String(text), $options: "i" } }],
      isDeleted: false,
    })
    .skip(parseInt(pageNo - 1) * limit)
    .limit(limit);
};

const searchCount = (searchValue) => {
  return businessCollection
    .find({
      $or: [{ businessType: { $regex: String(text), $options: "i" } }],
      isDeleted: false,
    })
    .count();
};

const getById = (condition) => businessCollection.findById(condition);

module.exports = {
  post,
  getAll,
  remove,
  update,
  getAllPagination,
  getById,
  searchCount,
  search,
};

// const search = (pageNo, limit, text) => {
//   // return businessCollection.aggregate([
//   //   {
//   //     $match: {
//   //       $and: [
//   //         {
//   //           $or: [{ businessType: { $regex: String(text), $options: "i" } }],
//   //           isDeleted: false,
//   //         },

//   //         { isDeleted: false },
//   //       ],
//   //     },
//   //   },
//   // ]);
// };
