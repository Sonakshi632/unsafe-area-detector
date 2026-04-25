const Area = require("../models/Area");

// 🧠 Smart Risk Analyzer (no API needed)
const analyzeRisk = (title, description, category) => {
  const text = `${title} ${description} ${category}`.toLowerCase();

  const highKeywords = [
    "danger", "attack", "robbery", "theft", "shooting", "violence",
    "rape", "murder", "unsafe", "dark", "kidnap", "stab", "gun", "weapon"
  ];
  const mediumKeywords = [
    "suspicious", "harassment", "fight", "drunk", "vandalism",
    "threat", "scary", "uncomfortable", "stalking", "eve teasing"
  ];

  if (highKeywords.some((word) => text.includes(word))) return "high";
  if (mediumKeywords.some((word) => text.includes(word))) return "medium";
  return "low";
};

// REPORT A NEW UNSAFE AREA
exports.reportArea = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    // 🧠 Auto analyze risk from keywords
    const riskLevel = analyzeRisk(title, description, category);

    const area = new Area({
      title,
      description,
      category,
      location,
      riskLevel, // ← auto decided, not from user
      reportedBy: req.user.id,
    });

    await area.save();

    res.status(201).json({ message: "Unsafe area reported successfully", area });

  } catch (err) {
    console.error("❌ FULL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET ALL UNSAFE AREAS
exports.getAllAreas = async (req, res) => {
  try {
    const areas = await Area.find()
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(areas);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE AREA BY ID
exports.getAreaById = async (req, res) => {
  try {
    const area = await Area.findById(req.params.id)
      .populate("reportedBy", "name email");

    if (!area) {
      return res.status(404).json({ error: "Area not found" });
    }

    res.json(area);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE AN AREA
// DELETE AN AREA
exports.deleteArea = async (req, res) => {
  try {
    const area = await Area.findById(req.params.id);

    if (!area) {
      return res.status(404).json({ error: "Area not found" });
    }

    await area.deleteOne();

    res.json({ message: "Area deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};