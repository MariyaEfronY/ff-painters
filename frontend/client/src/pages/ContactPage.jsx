import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .send(
        "service_rfia66g",     // 👈 replace with your EmailJS Service ID
        "template_53cjbnh",    // 👈 replace with your EmailJS Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "env7kAtyg8P8merLL"      // 👈 replace with your EmailJS Public Key
      )
      .then(
        () => {
          alert("✅ Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
          setIsSending(false);
        },
        (error) => {
          console.error(error);
          alert("❌ Failed to send. Try again.");
          setIsSending(false);
        }
      );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <motion.form
        onSubmit={sendEmail}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">
          Contact Us 📬
        </h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="4"
          required
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
        ></textarea>

        <button
          type="submit"
          disabled={isSending}
          className="w-full py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition"
        >
          {isSending ? "Sending..." : "Send Message"}
        </button>
      </motion.form>
    </div>
  );
};

export default ContactPage;
