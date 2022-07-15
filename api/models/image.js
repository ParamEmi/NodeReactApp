var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var imageSchema = new Schema(
  {
    
    user_id:{ type: Schema.Types.ObjectId },
    img:{type:String}
  },
  { collection: "image", timestamps: { createdAt: true, updatedAt: true } }
);

var Image = mongoose.model("Image", imageSchema);

module.exports = Image;
