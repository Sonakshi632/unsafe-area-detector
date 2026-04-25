// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const areaRoutes = require("./routes/areaRoutes");

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use("/api/areas", areaRoutes);

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//   console.log("✅ MongoDB Connected Successfully");
// })
// .catch((err) => {
//   console.error("❌ MongoDB Connection Error:", err.message);
//   process.exit(1);
// });

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// // Test Route
// app.get("/", (req, res) => {
//   res.json({ message: "🚀 AI Unsafe Area Detector API is running!" });
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // ← ADD THIS

const app = express();

// Middleware
app.use(cors()); // ← ADD THIS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
  console.error("❌ MongoDB Connection Error:", err.message);
  process.exit(1);
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/areas", require("./routes/areaRoutes"));

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "🚀 AI Unsafe Area Detector API is running!" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});