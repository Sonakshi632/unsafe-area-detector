const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  reportArea,
  getAllAreas,
  getAreaById,
  deleteArea,
} = require("../controllers/areaController");

// Get all areas
router.get("/", getAllAreas);

// Get single area
router.get("/:id", getAreaById);

// Create area (protected)
router.post("/", protect, reportArea);
// Delete area (protected)
router.delete("/:id", protect, deleteArea);

module.exports = router;