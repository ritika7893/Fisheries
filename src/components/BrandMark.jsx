import { Link } from "react-router-dom";

function BrandMark({ light = false }) {
  return (
    <Link
      className={`brand-mark${light ? " brand-mark-light" : ""}`}
      to="/"
      aria-label="Tide & Table home"
    >
      <span className="brand-icon" aria-hidden="true">
        <i className="bi bi-water" />
      </span>
      <span className="brand-name">
        tide<span>&</span>table
        <small>GOOD CATCH. GOOD CHOICE.</small>
      </span>
    </Link>
  );
}

export default BrandMark;
