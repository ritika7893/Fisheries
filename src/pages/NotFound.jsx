import { Link } from "react-router-dom";

function NotFound() {
  return <div className="not-found"><span className="eyebrow">A LITTLE OFF COURSE</span><strong>404</strong><h1>That page swam away.</h1><p>No worries. There’s plenty more good stuff back at the shore.</p><Link to="/" className="btn btn-dark-green">Back to home <i className="bi bi-arrow-up-right ms-2" /></Link></div>;
}

export default NotFound;
