import React, { useState } from "react";
import { Fish, Menu, ArrowUpRight, X } from "lucide-react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
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
        <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/shop">Shop all</NavLink>
        <NavLink className="nav-link" to="/categories">Categories</NavLink>
        <NavLink className="nav-link" to="/about">Our story</NavLink>
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
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
