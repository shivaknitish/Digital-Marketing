import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <h1 className="hero-title">
            Transform Your Business with
            <span className="gradient-text"> Digital Excellence</span>
          </h1>
          
          <p className="hero-subtitle">
            We're a full-service digital marketing agency that helps businesses 
            grow their online presence, increase brand awareness, and drive 
            measurable results through innovative strategies.
          </p>
          
          <div className="hero-buttons">
            <Link to="/contact" className="btn-primary">
              Get Started
            </Link>
            <Link to="/Services" className="btn-secondary">
              Learn More
            </Link>
            {/* <button className="btn-secondary">Learn More</button> */}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="stats-section container">
        <motion.div
          className="stats"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          animate={{
            // borderRadius: ["20px", "35px", "20px"],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <div className="stat-item">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" strokeWidth="2" fill="none" stroke="currentColor"/>
                <path d="M7 13l3 3 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor"/>
              </svg>
            </div>
            <div className="stat-number">500+</div>
            <div className="stat-label">Projects Completed</div>
          </div>

          <div className="stat-item">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H7M7 22H17M17 22H20C21.1046 22 22 21.1046 22 20V13M17 22V11M7 11V5.60844C7 4.34331 7.89151 3.26755 9.13016 3.03714L16.1302 1.70381C17.5943 1.43628 19 2.54238 19 4.03422V11M7 11H17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"/>
              </svg>
            </div>
            <div className="stat-number">98%</div>
            <div className="stat-label">Client Satisfaction</div>
          </div>

          <div className="stat-item">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15L12 9M12 15L8 11M12 15L16 11M12 3L4 7V10C4 15.5228 7.58172 20.3077 12 22C16.4183 20.3077 20 15.5228 20 10V7L12 3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"/>
              </svg>
            </div>
            <div className="stat-number">5+</div>
            <div className="stat-label">Years Experience</div>
          </div>
        </motion.div>
      </section>

      {/* Services and About moved to dedicated pages */}

      {/* CTA Section (Ready to Grow) */}
      <section id="cta" className="cta">
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          animate={{
            borderRadius: ["20px", "35px", "20px"],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <motion.h2 className="section-title">Ready to Grow Your Business?</motion.h2>
          <motion.div className="contact-content" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <p>Let's discuss how we can help you achieve your digital marketing goals.</p>
            <Link to="/contact" className="btn-primary">
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default HomePage;