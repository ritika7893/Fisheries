import { Link } from "react-router-dom";
import BrandMark from "./BrandMark.jsx";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-xl">
        <div className="footer-main">
          <div className="footer-brand">
            <BrandMark light />
            <p>Better seafood for your table. Better returns for the people who bring it to shore.</p>
            <div className="footer-socials" aria-label="Social media">
              <a href="https://instagram.com" aria-label="Instagram"><i className="bi bi-instagram" /></a>
              <a href="https://facebook.com" aria-label="Facebook"><i className="bi bi-facebook" /></a>
              <a href="https://wa.me/918001234567" aria-label="WhatsApp"><i className="bi bi-whatsapp" /></a>
            </div>
          </div>
          <div className="footer-links">
            <h3>Explore</h3>
            <Link to="/shop">Shop all</Link>
            <Link to="/categories">Our catch</Link>
            <Link to="/about">Our story</Link>
            <Link to="/contact">Get in touch</Link>
          </div>
          <div className="footer-links">
            <h3>Here to help</h3>
            <Link to="/contact">Ask a question</Link>
            <a href="mailto:hello@tideandtable.in">Delivery information</a>
            <a href="mailto:hello@tideandtable.in">Wholesale enquiries</a>
          </div>
          <div className="footer-newsletter">
            <h3>Ordering information</h3>
            <p>This website is a static catalogue preview. Contact our team for current availability and ordering.</p>
            <Link className="footer-order-link" to="/contact">Talk to our team <i className="bi bi-arrow-up-right ms-1" /></Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Tide & Table. Good catch. Good choice.</span>
          <div><a href="mailto:hello@tideandtable.in">Privacy</a><a href="mailto:hello@tideandtable.in">Terms</a></div>
          <span>Thoughtfully sourced seafood</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
