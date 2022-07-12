// const businessServiceCollection = require("../../models/businessService");
// const businessService = require("../../services/businessService.service");
// const userCollection = require("../../models/user");
// // const { pick } = require("lodash");

// const Create = async (req, res) => {
//   try {
//     const { businessTypeId, service, addedBy } = req.body;
//     const role = await userCollection.findById({ _id: req._user });

//     let serviceObject = {
//       businessTypeId,
//       service,
//       addedBy: req._user,
//       role: role.role,
//     };

//     const createdService = await businessService.post(serviceObject);
//     return res.status(201).json({
//       success: true,
//       message: "Business Service added succesfully",
//       data: createdService,
//     });
//     // }
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = { Create };
