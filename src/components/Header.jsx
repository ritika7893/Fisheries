import { Link, NavLink } from "react-router-dom";
import AnnouncementBar from "./AnnouncementBar.jsx";
import BrandMark from "./BrandMark.jsx";

function Header() {
  return (
    <>
      <AnnouncementBar />
      <header className="site-header">
        <nav className="navbar navbar-expand-lg container-xl py-0">
          <BrandMark />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavigation"
            aria-controls="mainNavigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNavigation">
            <div className="navbar-nav mx-auto">
              <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/shop">Shop all</NavLink>
              <NavLink className="nav-link" to="/categories">Categories</NavLink>
              <NavLink className="nav-link" to="/about">Our story</NavLink>
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </div>
            <div className="header-actions">
              <Link className="header-icon-button" to="/shop" aria-label="Browse seafood">
                <i className="bi bi-water" />
              </Link>
              <Link className="btn btn-dark-green header-contact" to="/contact">
                Get in touch <i className="bi bi-arrow-up-right ms-1" />
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
