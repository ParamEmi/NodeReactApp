const businessServiceCollection = require("../../models/businessService");
const businessService = require("../../services/businessService.service");
const userCollection = require("../../models/user");
const goalsCompanyBudget = require("../../models/goalsCompanyBudget");
const Business = require("../../models/business");
// const { pick } = require("lodash");

const Create = async (req, res) => {
  try {
    const { businessTypeId, service, addedBy } = req.body;
    console.log("req._user==========================", req._user);
    const role = await userCollection.findOne({ _id: req._user });
    console.log(role, "role");

    const existsBusinessType = await businessServiceCollection.find({
      businessTypeId: req.body.businessTypeId,
    });

    console.log(existsBusinessType, "res");
    let obj = {};
    existsBusinessType &&
      existsBusinessType.length > 0 &&
      existsBusinessType.map((val) => {
        if (val.service === req.body.service) {
          console.log(val.service, "sss");
          obj.service = val.service;
        }
      });

    if (obj.service) {
      return res.status(200).json({
        status: 401,
        success: false,
        message: "Service allready exist",
      });
    } else {
      let serviceObject = {
        businessTypeId,
        service,
        addedBy: req._user,
        role: role.role,
      };

      const createdService = await businessService.post(serviceObject);
      const getService = await goalsCompanyBudget.find({ addedBy: req._user });
      if (getService) {
        await goalsCompanyBudget.update(
          { addedBy: req._user },
          { $push: { service: createdService } }
        );
      }
      console.log(getService, "getService");
      return res.status(201).json({
        status: 200,
        success: true,
        message: "Business Service added successfully",
        data: createdService,
      });
    }

    // }
  } catch (error) {
    // send error status to frontend api dhng se bnao saalo.....
    return res.status(500).send(error.message);
  }
};
const getWithPagination = async (req, res) => {
  try {
    let { pageNo, limit } = req.params;
    const response = await businessService
      .getService(Number(pageNo), Number(limit))
      .populate("businessTypeId");

    //   .populate("courseId");
    const count = await businessServiceCollection.count({ isDeleted: false });
    if (!response) {
      return res.status(200).json({
        message: "Business Service not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        message: "Business Service get successfully",
        data: response,
        totalCount: count,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getServiceByTypeId = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await businessService.getByTypeId(id);
    // const result = response.map((item) => ({
    //   id: item._id,
    //   title: item.title,
    //   courseId: item.courseId,
    // }));
    // console.log(result,":::::")
    // console.log(response, "response get services by type id");
    if (!response) {
      return res.status(200).json({
        message: "Data not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        message: "Get Services Successfully",
        data: response,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const ServiceDelete = async (req, res) => {
  try {
    const response = await businessServiceCollection.updateOne(
      { _id: req.params.id },
      {
        isDeleted: true,
      }
    );
    // console.log(response, "p");
    if (response) {
      return res.status(200).json({
        success: true,
        message: "Business Service Deleted Successfully",
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Business Service Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const serviceEdit = async (req, res, next) => {
  try {
    const Id = req.params.id;
    if (!Id)
      return res.status(200).json({
        status: 401,
        success: false,
        message: "id is required ",
      });

    const existsBusinessType = await businessServiceCollection.find({
      businessTypeId: req.body.businessTypeId,
    });

    console.log(existsBusinessType, "res");
    let obj = {};
    existsBusinessType &&
      existsBusinessType.length > 0 &&
      existsBusinessType.map((val) => {
        if (val.service === req.body.service) {
          console.log(val.service, "sss");
          obj.service = val.service;
        }
      });

    if (obj.service) {
      return res.status(200).json({
        status: 401,
        success: false,
        message: "Service allready exist",
      });
    } else {
      const service = {
        businessTypeId: req.body.businessTypeId,
        service: req.body.service,
      };
      let result = await businessService.updateById(Id, service);
      console.log(result, "_____");
      if (!result)
        return res.status(200).json({
          status: 401,
          success: false,
          message: "Only admin can delete or modify project",
        });
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Business Service updated successfully",
        //   data: result,
      });
    }

    console.log(obj, "ddd");

    // let result = await businessService.updateById(Id, service);
    // console.log(result, "_____");
    // if (!result)
    //   return res.status(200).json({
    //     status: 401,
    //     success: false,
    //     message: "Only admin can delete or modify project",
    //   });
    // return res.status(200).json({
    //   status: 200,
    //   success: true,
    //   message: "Business Service updated successfully",
    //   //   data: result,
    // });
  } catch (error) {
    return res
      .status(200)
      .json({ status: 401, success: false, message: error.message });
  }
};

const Search = async (req, res) => {
  try {
    let { pageNo, limit, text } = req.params;
    const response = await businessService
      .getServiceSearch(Number(pageNo), Number(limit), text)
      .populate("businessTypeId");
    // const count = await businessServiceCollection.count({ isDeleted: false });

    if (response) {
      return res.status(200).json({
        success: true,
        data: response,
        count: response.length,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Service Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getByUserId = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await businessService.getServiceById(id);
    if (response) {
      return res.status(200).json({
        success: true,
        message: "Services of this Id is...",
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Service Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// const getAllCategory = async (req, res) => {
//   try {
//     let { _id, pageNo, limit } = req.params;
//     // console.log(_id, "222222222");

//     let response = {};

//     if (_id !== "all") {
//       response = await blogService.getByCategoryId(_id);

//       return res.status(200).json({
//         message: "Blogs get successfully",
//         data: response,
//         status: 201,
//       });
//     } else {
//       const response = await blogService.getAllBlogcategory(
//         Number(pageNo),
//         Number(limit)
//       );
//       const count = await blog.count({});
//       if (response) {
//         return res.status(200).json({
//           message: "Blogs get successfully",
//           data: response,
//           totalCount: count,
//           status: 201,
//         });
//       } else {
//         return res.status(200).json({
//           message: "Blogs error ",
//         });
//       }
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

module.exports = {
  Create,
  getWithPagination,
  ServiceDelete,
  serviceEdit,
  Search,
  getServiceByTypeId,
  getByUserId,
  //   getBlogById,
  //   BlogDelete,
  //   blogEdit,
  //   BlogSearch,
  //   getById,
  //   getAllCategory,
};
