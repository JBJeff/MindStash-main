import React from 'react';
import  './cs_bComponents/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo oder Markenname */}
        <div className="footer-logo">
          <h2>MindStash</h2>
        </div>

        {/* Links im Footer */}
        <div className="footer-links">
          <ul>
            <li><a href="/about" className="footer-link">Über uns</a></li>
            <li><a href="/contact" className="footer-link">Kontakt</a></li>
            <li><a href="/privacy" className="footer-link">Datenschutz</a></li>
            <li><a href="/terms" className="footer-link">Nutzungsbedingungen</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="footer-social">
          <a href="https://www.facebook.com" className="social-icon">Facebook</a>
          <a href="https://www.twitter.com" className="social-icon">Twitter</a>
          <a href="https://www.instagram.com" className="social-icon">Instagram</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 MindStash. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
}

export default Footer;
