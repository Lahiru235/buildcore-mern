const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");

// POST /api/contact  -> submit the "Get a Quote" / contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Name, email, and message are required." });
    }
    const entry = await ContactMessage.create(req.body);
    res.status(201).json({ message: "Thanks! We'll get back to you shortly.", entry });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/contact -> list submissions (for an internal dashboard)
router.get("/", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/contact/:id -> update status (new/contacted/closed)
router.put("/:id", async (req, res) => {
  try {
    const entry = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!entry) return res.status(404).json({ message: "Message not found" });
    res.json(entry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
