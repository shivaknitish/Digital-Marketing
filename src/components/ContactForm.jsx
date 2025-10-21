import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <motion.div
      className="form-container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            className="form-textarea"
            rows="5"
          />
        </div>
        <motion.button
          type="submit"
          className="submit-button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Send Message
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ContactForm;