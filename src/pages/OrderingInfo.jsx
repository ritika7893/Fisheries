import { Link } from "react-router-dom";

function OrderingInfo() {
  return (
    <section className="container-xl ordering-info section-space">
      <span className="eyebrow">A QUICK NOTE</span>
      <h1>Online ordering is coming soon<span>.</span></h1>
      <p>
        This site is a static catalogue preview, so accounts, baskets, and
        checkout are not available yet. For today's catch, prices, or ordering,
        please contact our team.
      </p>
      <div className="ordering-info-actions">
        <Link className="btn btn-dark-green" to="/contact">
          Contact our team <i className="bi bi-arrow-up-right ms-2" />
        </Link>
        <Link className="text-link" to="/shop">
          Continue browsing <i className="bi bi-arrow-right ms-2" />
        </Link>
      </div>
    </section>
  );
}

export default OrderingInfo;
