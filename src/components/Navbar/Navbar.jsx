import React from "react";
import { Fish, Menu, ArrowUpRight } from "lucide-react";
import "./Navbar.css";
export default function Navbar({ onLogin, onRegister }) {
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
      <nav>
        <a href="#home">Home</a>
        <a href="#about">About Us</a>
        <a href="#how">How It Works</a>
        <a href="#categories">Fish Categories</a>
        <a href="#services">Our Services</a>
        <a href="#contact">Contact Us</a>
      </nav>
      <div className="nav-actions">
        <button className="nav-login" onClick={onLogin}>
          Login
        </button>
        <button className="nav-register" onClick={onRegister}>
          Get Started <ArrowUpRight size={15} />
        </button>
      </div>
      <button className="mobile-menu">
        <Menu />
      </button>
    </header>
  );
}
