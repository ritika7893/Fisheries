import React from "react";
import { Fish, Mail, MapPin, Phone } from "lucide-react";
import "./Footer.css";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="brand footer-logo">
            <span className="brand-mark">
              <Fish />
            </span>
            <span>
              Aqua<span>Trade</span>
            </span>
          </div>
          <p>
            Connecting fisheries to markets through transparent trade, trusted
            partners and a smarter cold-chain supply network.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <a href="#about">About us</a>
          <a href="#how">How it works</a>
          <a href="#categories">Fish categories</a>
        </div>
        <div>
          <h4>Our platform</h4>
          <a href="#services">Supplier network</a>
          <a href="#services">Inventory management</a>
          <a href="#services">Cold-chain delivery</a>
        </div>
        <div>
          <h4>Get in touch</h4>
          <p>
            <MapPin size={14} /> Uttarakhand, India
          </p>
          <p>
            <Mail size={14} /> hello@aquatrade.in
          </p>
          <p>
            <Phone size={14} /> +91 98765 43210
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 AquaTrade Fisheries Marketplace{" "}
        <span>Built for a better blue economy.</span>
      </div>
    </footer>
  );
}
