import React, { useState } from "react";
import { Fish, Menu, ArrowUpRight, X } from "lucide-react";
import "./Navbar.css";
export default function Navbar({ onLogin, onRegister }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="site-nav">
      <a className="brand" href="#home">
        <span className="brand-mark">
          <Fish size={23} />
        </span>
        <span>
          Aqua<span>Trade</span>
          <small>FISHERIES MARKETPLACE</small>
        </span>
      </a>
      <nav className={isOpen ? "open" : ""}>
        <a href="#home">Home</a>
        <a href="#about">About Us</a>
        <a href="#how">How It Works</a>
        <a href="#categories">Fish Categories</a>
        <a href="#services">Our Services</a>
        <a href="#contact">Contact Us</a>
      </nav>
      <div className={`nav-actions ${isOpen ? "open" : ""}`}>
        <button className="nav-login" onClick={onLogin}>
          Login
        </button>
        <button className="nav-register" onClick={onRegister}>
          Get Started <ArrowUpRight size={15} />
        </button>
      </div>
      <button className="mobile-menu" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <X size={18} /> : <Menu />}
      </button>
    </header>
  );
}
