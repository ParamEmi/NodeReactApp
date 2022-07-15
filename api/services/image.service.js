const imageCollection = require("../models/image");

const post = (payload) => imageCollection.create(payload);
const get = (payload) => imageCollection.find();

module.exports = {
  post,
   get
};
