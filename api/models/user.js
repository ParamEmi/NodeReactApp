var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    password: { type: String },
    phone: { type: Number },
    mobile: { type: Number },
    state: { type: String },
    reffered: { type: String },
    resetLink: {
      type: String,
      default: "",
    },
    role: { type: Number, enum: [1, 2, 3], default: 2 },
    status: { type: Number, default: 0 },
    token: { type: String },
    isDeleted: { type: Boolean, default: false },
    addedBy: { type: Schema.Types.ObjectId, ref: "userSchema" },
    loginStatus: { type: Number, enum: [0, 1], default: 0 },
  },
  { collection: "users", timestamps: { createdAt: true, updatedAt: true } }
);

var User = mongoose.model("User", userSchema);

module.exports = User;
