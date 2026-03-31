const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: [ "owner" , "investor" , "admin" ],
    default:"investor",
  },

  balence: {
    type: Number,
    default: 0,
  },
},{
  timestamps: true
});

const UserSchema = mongoose.model("UserSchema", User)

module.exports = UserSchema;