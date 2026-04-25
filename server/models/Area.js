const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["theft", "assault", "harassment", "robbery", "other"],
      default: "other",
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    riskLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Area", areaSchema);