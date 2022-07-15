const imageService = require("../../services/image.service");
const fs = require("fs");
var path = require('path');


const uploadImage = async (req, res) => {

  try {

    var obj = {
        user_id: req.body.user_id,
        img: req.file.filename,
    }
    const insertImage = await imageService.post(obj)
     
    return res.status(200).json({
        success: true,
        message: "Images added succesfully",
        data: insertImage,
      });
    
  } catch (error) {
    return res.status(200).send({ statusCode: 500, message: error.message });
  }
};



const getImage = async (req, res) => {

    try {
  

      const Image = await imageService.get()
       
      return res.status(200).json({
          success: true,
          message: "Images get succesfully",
          data: Image,
        });
      
    } catch (error) {
      return res.status(200).send({ statusCode: 500, message: error.message });
    }
  };

module.exports = {
    uploadImage,
    getImage
};
