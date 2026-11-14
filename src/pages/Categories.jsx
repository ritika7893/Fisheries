import { Link } from "react-router-dom";
import { categories } from "../data/products.js";

function Categories() {
  return (
    <div className="categories-page">
      <div className="page-banner category-page-banner"><div className="container-xl"><span className="eyebrow eyebrow-light">STRAIGHT FROM THE SOURCE</span><h1>Meet the catch</h1><p>From familiar favourites to something new for your table.</p></div></div>
      <section className="container-xl section-space">
        <div className="row g-4 category-page-grid">
          {categories.map((category, index) => (
            <div className="col-12 col-md-6" key={category.slug}>
              <Link className="category-feature-card" to="/shop">
                <img src={category.image} alt="" />
                <div className="category-feature-copy"><span>0{index + 1} · {category.count}</span><h2>{category.name}</h2><p>{category.description}</p><strong>Explore category <i className="bi bi-arrow-up-right ms-2" /></strong></div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Categories;
