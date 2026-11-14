import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid.jsx";
import { categories, products } from "../data/products.js";

function Shop() {
  return (
    <div className="shop-page">
      <div className="page-banner shop-banner"><div className="container-xl"><span className="eyebrow eyebrow-light">FRESH FROM THE COAST</span><h1>The good stuff</h1><p>Carefully sourced. Thoughtfully packed. Ready for your table.</p></div></div>
      <div className="container-xl shop-content">
        <div className="shop-toolbar">
          <div><span className="shop-result-count">{products.length} good catches</span><span className="shop-result-caption"> · all sourced with care</span></div>
          <Link className="text-link" to="/categories">Browse by category <i className="bi bi-arrow-up-right ms-2" /></Link>
        </div>
        <div className="shop-layout">
          <aside className="shop-sidebar">
            <h3>From the coast</h3>
            <p className="static-shop-note">Every catch is thoughtfully sourced and carefully handled. Get in touch to ask about availability and ordering.</p>
            <Link className="btn btn-dark-green sidebar-contact-link" to="/contact">Ask us about today's catch</Link>
            <h3>Explore categories</h3>
            {categories.map((item) => <Link className="category-filter" key={item.slug} to="/categories">{item.name}<i className="bi bi-arrow-up-right" /></Link>)}
            <div className="sidebar-note"><i className="bi bi-snow2" /><strong>Cold-chain promise</strong><span>Kept at the right temperature from our coast to your kitchen.</span></div>
          </aside>
          <div className="shop-results"><ProductGrid products={products} /></div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
