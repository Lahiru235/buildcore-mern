require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const servicesRoutes = require("./routes/services");
const projectsRoutes = require("./routes/projects");
const teamRoutes = require("./routes/team");
const testimonialsRoutes = require("./routes/testimonials");
const blogRoutes = require("./routes/blog");
const contactRoutes = require("./routes/contact");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  })
);
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/services", servicesRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.json({ status: "Buildcore Construction API is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Buildcore API server running on port ${PORT}`);
});
