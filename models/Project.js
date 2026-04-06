const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    capital: {
      type: Number,
      required: true,
    },

    currentAmount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },

    maxPercentage: {
      type: Number,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);