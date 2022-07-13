const userCollection = require("../../models/user");
const userService = require("../../services/user.service");
const usersService = require("../../services/users.services");

const { pick } = require("lodash");

const testFun = async (req, res) => {
  try {
    
  
    return res.status(201).json({
      success: true,
      message: "User added succesfully",
      data: {},
    });
  } catch (error) {
    console.log(error);
  }
};


const createUser = async (req, res) => {
  try {
    const { firstName, email, password, addedBy } = req.body;
    let user = {
      firstName,
      email,
      password,
      role: 3,
    };
    // const user1 = await usersService.findOne(req._user);
    // if (!user1)
    //   return res.status(401).json({
    //     success: false,
    //     message: "User not found with provided token!!",
    //   });

    // user.addedBy = user1._id;

    const createdUser = await userService.post(user);
    return res.status(201).json({
      success: true,
      message: "User added succesfully",
      data: createdUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  try {
    let { pageNo, limit } = req.params;
    const response = await userService.getUserWithPagination(
      Number(pageNo),
      Number(limit)
    );

    const count = await userCollection.count({ role: 3, isDeleted: false });
    if (!response) {
      return res.status(200).json({
        message: "User not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        message: "Users get successfully",
        data: response,
        totalCount: count,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const UserEdit = async (req, res, next) => {
  try {
    const Id = req.params.id;
    if (!Id)
      return res.status(200).json({
        status: 401,
        success: false,
        message: "Id is required ",
      });
    let data = pick(req.body, ["firstName", "email"]);
    let result = await userService.update(
      {
        _id: Id,
      },
      { $set: { ...data } },
      { fields: { _id: 1 }, new: true }
    );
    return res.status(200).json({
      status: 200,
      success: true,
      data: result,
      message: "User updated successfully",
    });
  } catch (error) {
    return res
      .status(200)
      .json({ status: 401, success: false, message: error.message });
  }
};

const userDelete = async (req, res) => {
  try {
    const response = await userCollection.updateOne(
      { _id: req.params.id },
      {
        isDeleted: true,
      }
    );
    if (response) {
      return res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No User Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const UserSearch = async (req, res) => {
  try {
    let { text, pageNo, limit } = req.params;
    const response = await userService.getUserBySearch(
      text,
      Number(pageNo),
      Number(limit)
    );
    if (response) {
      return res.status(200).json({
        success: true,
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No User Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const loginStatusUpdate = async (req, res, next) => {
  try {
    const Id = req._user;
    if (!Id)
      return res.status(200).json({
        status: 401,
        success: false,
        message: "Id is required ",
      });
    let data = pick(req.body, ["loginStatus"]);
    let result = await userService.loginStatusUpdate(
      {
        _id: Id,
      },
      { $set: { ...data } },
      { fields: { _id: 1 }, new: true }
    );

    return res.status(200).json({
      status: 200,
      success: true,
      data: result,
      message: "User Status Updated successfully",
    });
  } catch (error) {
    return res
      .status(200)
      .json({ status: 401, success: false, message: error.message });
  }
};

module.exports = {
  createUser,
  getUser,
  UserEdit,
  userDelete,
  UserSearch,
  loginStatusUpdate,
  testFun,
};
