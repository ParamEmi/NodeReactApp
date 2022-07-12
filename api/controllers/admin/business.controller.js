const businessCollection = require("../../models/business");
const businessServiceCollection = require("../../models/businessService");
const businessService = require("../../services/business.service");
const Business = require("../../models/business");
const { pick } = require("lodash");

const createBusinessType = async (req, res) => {
  try {
    const { businessType } = req.body;
    const type = {
      businessType,
    };
    const exist = await businessCollection.findOne({
      businessType,
      isDeleted: false,
    });
    console.log(exist, "exist");
    if (exist) {
      return res.status(400).json({
        message: "Business type already exist",
      });
    } else {
      const createdType = await businessService.post(type);
      return res.status(201).json({
        success: true,
        message: "Type added successfully",
        data: createdType,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllbussTypes = async (req, res) => {
  try {
    const result = await businessService.getAll();
    if (!result) {
      return res.status(200).json({
        message: "Data not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        message: "Data get successfully",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const Delete = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await businessCollection.updateOne(
      { _id: req.params.id },
      {
        isDeleted: true,
      }
    );
    let unitres = await businessServiceCollection.updateMany(
      { businessTypeId: id },
      {
        isDeleted: true,
      }
    );
    console.log(unitres, "unitres");

    if (response) {
      return res.status(200).json({
        success: true,
        message: "Business Type Deleted Successfully",
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Business Type category Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const Edit = async (req, res, next) => {
  try {
    const businessId = req.params.id;
    if (!businessId)
      return res.status(200).json({
        status: 401,
        success: false,
        message: "businessId is required ",
      });
    let data = pick(req.body, ["isDeleted", "businessType"]);
    console.log(data, "data");
    const businessData = await Business.find({
      businessType: data.businessType,
    });

    let message = "Business Type updated successfully";
    if (data.isDeleted) {
      message = "Business Type Deleted successfully";
    }

    const resultdata = businessData.filter((val) => {
      console.log(val);
      if (val.businessType === data.businessType) {
        return val.businessType;
        // return res.status(400).json({
        //   message: "Business type already exist",
        // });
      }
    });
    let obj = {};
    resultdata.map((val) => {
      if (val.businessType === data.businessType) {
        obj.type = val.businessType;
      }
    });
    console.log(obj, "obj");

    // console.log(resultdata, "resultdata");
    // if (resultdata) {
    // }
    if (obj.type === data.businessType) {
      return res.status(200).json({
        status: 400,
        message: "Business type already exist",
      });
    } else {
      let result = await businessService.update(
        {
          _id: businessId,
        },
        { $set: data },
        { fields: { _id: 1 }, new: true }
      );

      if (!result)
        return res.status(200).json({
          status: 401,
          success: false,
          message: "Only admin can delete or modify project",
        });
      return res.status(200).json({
        status: 200,
        success: true,
        result,
        message: "Business Type updated successfully",
      });
    }
  } catch (error) {
    return res
      .status(200)
      .json({ status: 401, success: false, message: error.message });
  }
};
const getAllWithPagination = async (req, res) => {
  try {
    let { pageNo, limit } = req.params;
    const result = await businessService.getAllPagination(
      Number(pageNo),
      Number(limit)
    );
    const count = await businessCollection.count({ isDeleted: false });
    if (!result) {
      return res.status(200).json({
        message: "Data not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        message: "Data get successfully",
        data: result,
        totalCount: count,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
const getById = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await businessService.getById(id);
    if (response) {
      return res.status(200).json({
        success: true,
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Data Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const Search = async (req, res) => {
  try {
    let { pageNo, limit, text } = req.params;
    const response = await businessService.search(
      Number(pageNo),
      Number(limit),
      text
    );
    if (response) {
      return res.status(200).json({
        success: true,
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Type Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
module.exports = {
  createBusinessType,
  getAllbussTypes,
  Delete,
  Edit,
  getAllWithPagination,
  getById,
  Search,
};
