import { useState } from "react";
import { submitContact } from "../api/api";

const initialForm = { name: "", email: "", phone: "", message: "" };

export default function CTA() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text }
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await submitContact(form);
      setStatus({ type: "success", text: res.message || "Thanks! We'll be in touch." });
      setForm(initialForm);
    } catch (err) {
      setStatus({
        type: "error",
        text:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section cta" id="contact">
      <div className="container">
        <h2>Have a Project in Mind?</h2>
        <p>
          Tell us what you're building. We'll get back to you with a
          straight answer — not a sales pitch.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone number (optional)"
            value={form.phone}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Tell us about your project"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Sending..." : "Get a Quote"}
          </button>
          {status && (
            <p className={`form-status ${status.type}`}>{status.text}</p>
          )}
        </form>
      </div>
    </section>
  );
}
