import React, { useEffect, memo, useState, useRef, lazy, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './components/Navbar.css';

// Lazy load components
const Plasma = lazy(() => import('../Plasma'));
const HomePage = lazy(() => import('./components/HomePage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
// Lazy load ServicesPage
const ServicesPage = lazy(() => import('./components/ServicesPage'));

// Loading spinner component
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh' 
  }}>
    <div style={{ 
      width: '50px', 
      height: '50px', 
      border: '5px solid rgba(255, 255, 255, 0.1)', 
      borderTopColor: '#667eea', 
      borderRadius: '50%', 
      animation: 'spin 1s linear infinite' 
    }} />
  </div>
);
/* ContactForm styles are imported by the ContactForm component so they only load on the Contact page */

const App = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Disable smooth scroll initially
    document.documentElement.classList.add('no-smooth-scroll');
    
    // Reset scroll position
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    // Re-enable smooth scroll after initial load
    setTimeout(() => {
      document.documentElement.classList.remove('no-smooth-scroll');
    }, 100);
    
    return () => {
      document.documentElement.classList.remove('no-smooth-scroll');
    };
  }, []);

  // On full page reloads, redirect to home so the app always starts at '/'
  useEffect(() => {
    try {
      const navEntries = performance.getEntriesByType ? performance.getEntriesByType('navigation') : [];
      const navType = (navEntries && navEntries[0] && navEntries[0].type) || (performance.navigation && performance.navigation.type === 1 ? 'reload' : 'navigate');
      if ((navType === 'reload' || navType === 'back_forward') && location && location.pathname && location.pathname !== '/') {
        // replace the current history entry so the back button isn't affected
        navigate('/', { replace: true });
      }
    } catch (e) {
      // If performance API isn't supported, do nothing
      // fallback: don't change navigation to preserve bookmark behavior
    }
  // run only once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled state if user scrolls down more than 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, false);

    return () => {
      window.removeEventListener('scroll', handleScroll, false);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    // Prevent scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };
  
  // Close menu when route changes and scroll to top
  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
    // Use smooth scrolling behavior when navigating between pages
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  return (
    <div className="app">
      {/* Lazy load Plasma background with error boundary */}
      <Suspense fallback={null}>
        <Plasma 
          color="#9D8EC7" 
          speed={0.6} 
          direction="forward" 
          scale={1.1} 
          opacity={0.8} 
          mouseInteractive={true} 
        />
      </Suspense>
      
      {/* Navigation */}
      <nav className="navbar">
        <div className={`nav-container ${isScrolled ? 'glass' : ''}`}>
          <div className="nav-logo">
              <h2>EasyLandIn</h2>
          </div>
          {/* Desktop Menu */}
          <div className="nav-menu">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
          </div>

          {/* Hamburger Icon */}
          <div 
            className={`nav-hamburger ${isMenuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && toggleMenu()}
          >
            <div />
            <div />
            <div />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/about" onClick={toggleMenu}>About</Link>
        <Link to="/services" onClick={toggleMenu}>Services</Link>
        <Link to="/contact" onClick={toggleMenu}>Contact</Link>
      </div>

      {/* Routes with lazy loading */}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>

      

  {/* Footer */}
  <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h3>EasyLandin</h3>
              <p><i>Let’s make your brand viral</i></p>
            </div>
            <div className="footer-links-container">
              <div className="footer-column">
                <h4>Quick Links</h4>
                <div className="footer-links">
                  <Link to="/">Home</Link>
                  <Link to="/about">About</Link>
                  <Link to="/services">Services</Link>
                  <Link to="/contact">Contact</Link>
                </div>
              </div>
              <div className="footer-column">
                <h4>Services</h4>
                <div className="footer-links">
                  <Link to="/services#search-engine-optimization">Search Engine Optimization</Link>
                  <Link to="/services#social-media-marketing">Social Media Marketing</Link>
                  <Link to="/services#content-marketing">Content Marketing</Link>
                  <Link to="/services#web-app-design-development">Web/App Design & Development</Link>
                </div>
              </div>
              <div className="footer-column">
                <h4>Follow Us</h4>
                <div className="social-links">
                  <a href="https://facebook.com" target="_blank" className="social-icon facebook" title="Facebook">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" className="social-icon instagram" title="Instagram">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" className="social-icon linkedin" title="LinkedIn">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" className="social-icon twitter" title="Twitter">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 EasyLandin</p>
          </div>
        </div>
      </footer>
    </div>
  );
});

export default App;
