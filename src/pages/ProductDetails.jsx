import { Link, useParams } from "react-router-dom";
import { getProductBySlug } from "../services/productService.js";
import { formatPrice } from "../data/products.js";
import NotFound from "./NotFound.jsx";

function ProductDetails() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  if (!product) return <NotFound />;

  return (
    <div className="container-xl detail-page">
      <div className="breadcrumb-line"><Link to="/">Home</Link><i className="bi bi-chevron-right" /><Link to="/shop">Shop</Link><i className="bi bi-chevron-right" /><span>{product.name}</span></div>
      <div className="row g-5 product-detail">
        <div className="col-lg-6"><div className="detail-image-wrap"><img src={product.image} alt={product.name} /><span className="product-badge badge-fresh">{product.badge}</span></div></div>
        <div className="col-lg-6 detail-copy">
          <span className="eyebrow">{product.species}</span><h1>{product.name}</h1>
          <div className="detail-rating"><span>★★★★★</span> {product.rating} <a href="#reviews">({product.reviews} reviews)</a></div>
          <div className="detail-price">{formatPrice(product.price)} <del>{product.compareAt && formatPrice(product.compareAt)}</del></div>
          <div className="detail-availability"><i className="bi bi-check-circle-fill" /> Thoughtfully sourced · Availability by enquiry</div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-origin"><i className="bi bi-geo-alt" /><span><strong>Sourced with care</strong><small>{product.origin} · Traceable to the coast</small></span></div>
          <div className="detail-option-group"><strong>Available pack sizes</strong><div className="option-buttons">{product.options.map((item, index) => <span className={`static-option${index === 0 ? " selected" : ""}`} key={item.label}>{item.label}</span>)}</div></div>
          <Link className="btn btn-dark-green detail-enquiry" to="/contact">Enquire about this catch <i className="bi bi-arrow-up-right ms-2" /></Link>
          <div className="detail-promises"><div><i className="bi bi-snow2" /> Delivered chilled</div><div><i className="bi bi-patch-check" /> Quality checked</div><div><i className="bi bi-arrow-repeat" /> Easy 24-hour support</div></div>
        </div>
      </div>
      <section className="detail-bottom" id="reviews"><span className="eyebrow">THE GOOD-TO-KNOW</span><h2>Freshness you can feel good about.</h2><p>Every catch is handled with care, kept cold from the moment it leaves the coast and delivered in insulated, food-safe packaging. Questions about prep? Our fish-loving team is just a message away.</p></section>
    </div>
  );
}

export default ProductDetails;
