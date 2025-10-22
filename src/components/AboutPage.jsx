import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

// Lazy load image
const aboutUsImage = '../../assets/about-us-image.png';

// Image component with lazy loading
const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className={className} style={{ position: 'relative' }}>
      {!isLoaded && (
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}>
          <div style={{ 
            width: '30px', 
            height: '30px', 
            border: '3px solid rgba(255, 255, 255, 0.1)', 
            borderTopColor: '#667eea', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite' 
          }} />
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        loading="lazy" 
        onLoad={() => setIsLoaded(true)} 
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s' }} 
      />
    </div>
  );
};

const testimonials = [
  {
    name: 'Donna Stroupe',
    title: 'CEO, TechVision Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    quote: 'Working with EasyLandin has been a game-changer. Their attention to detail and commitment to excellence is unmatched. They delivered beyond our expectations and transformed our digital presence completely. Highly recommended!',
  },
  {
    name: 'Michael Johnson',
    title: 'Founder, Creative Studio',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    quote: 'From concept to execution, every step was seamless. The team\'s creativity and technical expertise brought our vision to life in ways we never imagined. Their professionalism and dedication made the entire process enjoyable and stress-free.',
  },
  {
    name: 'Sarah Rodriguez',
    title: 'Marketing Director, GrowthLabs',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    quote: 'Outstanding service and incredible results! Our website traffic increased by 300% within the first month. The team\'s strategic approach and innovative solutions have truly set us apart from the competition. Worth every penny!',
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Auto-play every 5 seconds

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <motion.section
      className="testimonial-container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="testimonial-header">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>What Our Clients Say</h2>
        <p style={{ textAlign: 'center', color: '#b0b0b0', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Real stories from satisfied customers who have experienced measurable growth.
        </p>
      </div>

      <div className="carousel-wrapper">
        <div className="carousel" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {testimonials.map((card, index) => (
            <div className="testimonial-card" key={index}>
              <div className="card-content">
                <div className="profile-section">
                  <div className="profile-image">
                    <LazyImage src={card.image} alt={card.name} className="profile-img" />
                  </div>
                  <div className="profile-info">
                    <div className="profile-name">{card.name}</div>
                    <div className="profile-title">{card.title}</div>
                  </div>
                </div>
                <div className="testimonial-text">{card.quote}</div>
                <div className="rating">
                  {'★★★★★'.split('').map((star, i) => <span key={i} className="star">{star}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-controls">
        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <span key={index} className={`dot ${index === currentIndex ? 'active' : ''}`} onClick={() => setCurrentIndex(index)} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const AboutPage = () => {
  return (
    <>
      <section id="about-page" className="about">
        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>Why Choose EasyLandin?</h2>
            <p>EasyLandIn is a Bangalore-based digital marketing agency dedicated to driving real business results. Our expert team combines creativity, technical skills, and data-driven strategies to deliver measurable online success for startups, SMEs, and enterprises.</p>
            <ul>
              <li>Experienced marketers and certified ad specialists</li>
              <li>Customized solutions for your unique goals</li>
              <li>Transparent communication and regular reporting</li>
            </ul>
            <p className="mission-statement"><b>Our mission:</b> Fuel your growth through innovative digital marketing.</p>
          </motion.div>
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <LazyImage src={aboutUsImage} alt="About EasyLandin" className="about-img-container" />
          </motion.div>
        </div>
      </section>

      <TestimonialCarousel />
    </>
  );
};

export default AboutPage;