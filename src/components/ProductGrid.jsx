import ProductCard from "./ProductCard.jsx";

function ProductGrid({ products: items }) {
  if (!items.length) {
    return <div className="empty-state"><i className="bi bi-water" /><h3>Nothing in the net just yet</h3><p>Try a different search or category.</p></div>;
  }
  return <div className="row g-4 product-grid">{items.map((product) => <div className="col-6 col-lg-3" key={product.id}><ProductCard product={product} /></div>)}</div>;
}

export default ProductGrid;
