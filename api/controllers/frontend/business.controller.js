const businessCollection = require("../../models/business");
const businessService = require("../../services/business.service");
const userCollection = require("../../models/user");

const createBusinessType = async (req, res) => {
  try {
    const { businessType } = req.body;
    const type = {
      businessType,
    };
    const exist = await businessCollection.findOne({
      businessType,
    });
    if (exist) {
      return res.status(400).json({
        message: "This type already exist",
      });
    } else {
      const createdType = await businessService.post(type);
      return res.status(201).json({
        success: true,
        message: "Type Add successfully..",
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

// const getBusinessByUser = async (req, res) => {
//   debugger;
//   try {
//     console.log(req._user, "req.user");
//     const bussType = "62823e0434b4c24a400d8032";
//     let result = "";
//     const user = await userCollection.findOne({ _id: req._user });
//     if (user && user.businessType) {
//       result = await businessCollection
//         .findOne({ _id: user.businessType })
//         .populate("service");
//     }
//     // if(bussType){
//     //     result = await businessCollection.findOne({_id:bussType}).populate('service').exec()
//     // }

//     if (!result) {
//       return res.status(400).json({
//         message: "Data not found",
//         status: 404,
//       });
//     } else {
//       return res.status(200).json({
//         message: "Data get successfully",
//         data: result,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };

module.exports = {
  createBusinessType,
  getAllbussTypes,
  Delete,
  // getBusinessByUser,
};
