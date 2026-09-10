const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema(
  {
    quote: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    avatar: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", TestimonialSchema);
