import { Link } from "react-router-dom";
import { formatPrice } from "../data/products.js";

function ProductCard({ product }) {
  const weight = product.options[0].label;

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link to={`/product/${product.slug}`} className="product-image-link" aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        <span className={`product-badge${product.fresh ? " badge-fresh" : ""}`}>{product.badge}</span>
        <Link className="quick-view" to={`/product/${product.slug}`}>Quick view <i className="bi bi-arrow-up-right" /></Link>
      </div>
      <div className="product-info">
        <div className="product-meta">
          <span>{product.species.split(" · ")[0]}</span>
          <span><i className="bi bi-star-fill" /> {product.rating}</span>
        </div>
        <Link to={`/product/${product.slug}`} className="product-title">{product.name}</Link>
        <div className="product-price-row">
          <div><strong>{formatPrice(product.price)}</strong>{product.compareAt && <del>{formatPrice(product.compareAt)}</del>}</div>
          <span className="price-unit">/ {weight}</span>
        </div>
        <div className="product-availability"><i className="bi bi-check-circle-fill" /> Sourced with care</div>
        <Link className="product-card-link" to={`/product/${product.slug}`}>View details <i className="bi bi-arrow-right ms-1" /></Link>
      </div>
    </article>
  );
}

export default ProductCard;
