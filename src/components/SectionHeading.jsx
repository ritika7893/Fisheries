import { Link } from "react-router-dom";

function SectionHeading({ eyebrow, title, description, link, linkLabel = "Shop all" }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {link && <Link className="text-link" to={link}>{linkLabel}<i className="bi bi-arrow-up-right ms-2" /></Link>}
    </div>
  );
}

export default SectionHeading;
