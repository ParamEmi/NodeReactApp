const companyService = require("../../services/companyBudget.service");
const usersService = require("../../services/users.services");
const userCollection = require("../../models/user");
const businessCollection = require("../../models/business");
const company_budgets = require("../../models/goalsCompanyBudget");
const companyBudgetService = require("../../services/companyBudget.service");

const { pick } = require("lodash");

const _ = require("lodash");

const comapny_budget = async (req, res) => {
  try {
    const { companyBudget, service, calculatedgoals } = req.body;

    const user1 = await usersService.findOne(req._user);

    let addedBy = user1._id;

    const comapny_budget = {
      companyBudget: companyBudget,
      service: service.service,
      calculatedgoals: calculatedgoals,
    };
    const created_Comapny_budget = await companyService.post(comapny_budget);
    return res.status(201).json({
      success: true,
      message: "ComapnyGoal_budget added succesfully",
      data: comapny_budget,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const saveGoalsBudget = async (req, res) => {
  try {
    const { companyBudget, service, calculatedgoals } = req.body;
    //  const user1 = await usersService.findOne(req._user);
    let addedBy = req._user;
    console.log(addedBy, "ss");
    //
    const Goals_budget = {
      companyBudget,
      service,
      calculatedgoals,
      addedBy,
    };
    // find by user if goal budget exist or not
    const found = await company_budgets.findOne({ addedBy });
    if (found) {
      //update goal budget
      await company_budgets.findOneAndUpdate({ addedBy }, Goals_budget);
    } else {
      //create goal budget
      await company_budgets.create(Goals_budget);
    }
    return res.status(200).json({
      success: true,
      message: "Calculated successfully",
      data: Goals_budget,
    });
  } catch (error) {
    return res.status(200).json({
      message: error.message,
      success: false,
    });
  }
};

const getBusinessByUser = async (req, res) => {
  try {
    // const bussType = "62823e0434b4c24a400d8032";
    let result = "";
    let arr = [];
    const user = await userCollection.findOne({ _id: req._user });
    console.log(user, "user");

    if (user && user.businessType) {
      result = await businessCollection
        .findOne({ _id: user.businessType })
        .populate({ path: "service", match: { isDeleted: false } });
      console.log(result, "result");
    }
    const service =
      result &&
      result.service &&
      result.service.filter((val) => {
        if (val.role == 1) {
          return arr.push(val);
        }
      });
    let result1 =
      result &&
      result.service &&
      result.service.filter((item) => {
        if (item.addedBy == req._user) {
          return arr.push(item);
        }
      });
    // service.map((i) => {
    //   arr.push(i);
    // });
    // result1.map((v) => {
    //   console.log(v, "ddd");
    //   arr.push(v);
    // });

    const serviceData = {
      businessType: result.businessType,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      isDeleted: result.isDeleted,
      id: result.id,
      service: arr,
    };

    // if(bussType){
    //     result = await businessCollection.findOne({_id:bussType}).populate('service').exec()
    // }
    if (!result) {
      return res.status(400).json({
        message: "Data not found",
        status: 404,
        data: [],
      });
    } else {
      return res.status(200).json({
        message: "Data get successfully",

        data: serviceData,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
// const editPersonalBudget = async (req, res) => {
//   try {
//     let personalId = req.params.id;

//     if (!personalId)
//       return res.status(200).json({
//         status: 401,
//         success: false,
//         message: "courseUnitId is required ",
//       });
//     let data = pick(req.body, [
//       "income",
//       "housing",
//       "transportation",
//       "houseHold",
//       "loanPayments",
//       "personalInsurance",
//       "discretionary",
//       "addedBy",
//     ]);
//     if (data.isDeleted) {
//       message = "Course Unit Deleted Successfully";
//     }

//     let resultResponse = await personalService.update(
//       {
//         _id: personalId,
//       },
//       { $set: data },
//       { fields: { _id: 1 }, new: true }
//     );

//     const result = await personalService.get(personalId);
//     if (!result)
//       return res.status(200).json({
//         status: 401,
//         success: false,
//         message: "Only admin can delete or modify project",
//       });
//     return res.status(200).json({
//       status: 200,
//       success: true,
//       updateItem: result,
//       message: "Course Unit updated successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(200)
//       .json({ status: 401, success: false, message: error.message });
//   }
// };
//

const editCompanyBudget = async (req, res) => {
  try {
    let goalsId = req.params.id;

    if (!goalsId)
      return res.status(200).json({
        status: 401,
        success: false,
        message: "courseUnitId is required ",
      });
    let data = pick(req.body, ["companyBudget", "service", "calculation"]);
    // if (data.isDeleted) {
    //   message = "Course Unit Deleted Successfully";
    // }

    let resultResponse = await companyBudgetService.update(
      {
        _id: goalsId,
      },
      { $set: data },
      { fields: { _id: 1 }, new: true }
    );

    const result = await companyBudgetService.get(goalsId);
    if (!result)
      return res.status(200).json({
        status: 401,
        success: false,
        message: "Something went wrong",
      });
    return res.status(200).json({
      status: 200,
      success: true,
      updateItem: result,
      message: "Goal_budget updated successfully",
    });
  } catch (error) {
    return res
      .status(200)
      .json({ status: 401, success: false, message: error.message });
  }
};

const getGoalBudget = async (req, res) => {
  try {
    let addedBy = req._user;
    const Goals_Budget = await company_budgets.findOne({ addedBy });
    return res.status(200).json({
      success: true,
      Goals_Budget,
      message: "Goals_Budget  success",
    });
  } catch (error) {
    return res.status(200).json({
      message: error.message,
      success: false,
    });
  }
};

const getGoalById = async (req, res) => {
  let id = req.params.id;
  try {
    // let addedBy1 = req._user;
    // console.log(addedBy1, "aaa");
    const Goals_Budget = await company_budgets.find({ addedBy: id });
    console.log(Goals_Budget, "Goals_Budget");
    return res.status(200).json({
      success: true,
      data: Goals_Budget,
      message: " get Goals_Budget  success",
    });
  } catch (error) {
    return res.status(200).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  comapny_budget,
  //   editPersonalBudget,
  editCompanyBudget,
  getBusinessByUser,
  getGoalBudget,
  saveGoalsBudget,
  getGoalById,
};
