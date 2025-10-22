import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const ServicesPage = () => {
  const location = useLocation();
  
  // Add scroll to hash functionality directly in the main component
  useEffect(() => {
    if (location && location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        // small timeout to allow layout to settle
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    }
  }, [location]);
  const services = [
    {
      title: "Search Engine Optimization",
      description: "Boost your website's visibility and organic traffic with our proven SEO strategies.",
      icon: "🔍"
    },
    {
      title: "Social Media Marketing",
      description: "Engage your audience and build brand loyalty across all social platforms.",
      icon: "📱"
    },
    {
      title: "Online Advertising",
      description: "Maximize your reach and ROI with targeted ads across Google, social media, and more.",
      icon: "💡"
    },
    {
      title: "Content Marketing",
      description: "Create compelling content that resonates with your audience and drives engagement.",
      icon: "✍️"
    },
    {
      title: "Marketing Strategy & Analytics",
      description: "Unlock business growth with data-driven strategies and deep analytics.",
      icon: "📊"
    },
    {
      title: "Web/App Design & Development",
      description: "Build stunning, responsive websites and applications that convert visitors into customers.",
      icon: "💻"
    }
  ];

  return (
    <section id="services-page" className="services container">
      <motion.div
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        viewport={{ once: true }}
      >
        <h2 className="section-title">Our Core Services</h2>
        <div className="services-grid">
          {services.map((s, i) => {
            // create an id slug for each service to support fragment links
            const slug = [s.title]
              .join('')
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '');
            return (
              <div className="service-card" id={slug} key={i}>
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <p className="service-placeholder">Detailed description, examples, and pricing information will be available here soon.</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

// Scroll to anchor when the page loads with a hash (e.g., /services#social-media-marketing)
export function ServicesPageWithScroll(props) {
  const location = useLocation();
  useEffect(() => {
    if (location && location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        // small timeout to allow layout to settle
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    }
  }, [location]);

  return <ServicesPage {...props} />;
}

export default ServicesPage;