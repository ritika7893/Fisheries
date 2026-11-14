import { Link } from "react-router-dom";
import { categories, products } from "../data/Products.js";
import ProductGrid from "../components/ProductGrid.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

import "../styles/App.css";
const bestSellers = products.slice(0, 4);
const freshCatch = products.filter((product) => product.fresh).slice(1, 5);

function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-image" />
        <div className="container-xl hero-content">
          <div className="hero-copy">
            <span className="hero-kicker"><span /> FROM THE COAST, WITH CARE</span>
            <h1>Good seafood.<br />A better <em>way.</em></h1>
            <p>Traceable, beautifully fresh catch from the people who know the sea best. Delivered cold, straight to your door.</p>
            <div className="hero-actions">
              <Link className="btn btn-coral" to="/shop">Shop today’s catch <i className="bi bi-arrow-up-right ms-2" /></Link>
              <Link className="hero-story-link" to="/about">Why Tide & Table <i className="bi bi-arrow-right ms-2" /></Link>
            </div>
            <div className="hero-proof">
              <span><i className="bi bi-patch-check" /> Fisher direct</span>
              <span><i className="bi bi-snow2" /> Cold-chain fresh</span>
              <span><i className="bi bi-geo-alt" /> Traceable catch</span>
            </div>
          </div>
          <div className="hero-note">
            <span className="note-icon"><i className="bi bi-water" /></span>
            <div><strong>Today’s catch,</strong><br />handled with care.</div>
          </div>
        </div>
        <div className="hero-vertical-label">A MORE THOUGHTFUL SEAFOOD MARKET</div>
      </section>

      <section className="trust-strip">
        <div className="container-xl trust-items">
          <div><i className="bi bi-compass" /><span><strong>Know your source</strong><small>Coast to kitchen traceability</small></span></div>
          <div><i className="bi bi-snow2" /><span><strong>Kept perfectly cold</strong><small>Freshness, all the way home</small></span></div>
          <div><i className="bi bi-cash-coin" /><span><strong>Fair from the start</strong><small>Better returns for fishers</small></span></div>
          <div><i className="bi bi-truck" /><span><strong>At your door, fast</strong><small>Carefully packed & delivered</small></span></div>
        </div>
      </section>

      <section className="section-space container-xl">
        <SectionHeading eyebrow="A GOOD PLACE TO START" title="Find your kind of fresh" description="A little something for every table, thoughtfully sourced." link="/categories" linkLabel="All categories" />
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link className={`category-card category-card-${index + 1}`} to="/categories" key={category.slug}>
              <img src={category.image} alt="" loading="lazy" />
              <div className="category-overlay"><span>{category.count}</span><h3>{category.name}</h3><i className="bi bi-arrow-up-right" /></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-space featured-section">
        <div className="container-xl">
          <SectionHeading eyebrow="LOVED BY OUR COMMUNITY" title="The good catches" description="Customer favourites, chosen fresh from the coast." link="/shop" />
          <ProductGrid products={bestSellers} />
        </div>
      </section>

      <section className="story-banner">
        <div className="container-xl story-banner-inner">
          <div className="story-banner-copy">
            <span className="eyebrow eyebrow-light">A BETTER KIND OF SEAFOOD MARKET</span>
            <h2>Good for your table.<br /><em>Better for the coast.</em></h2>
            <p>We bring fishers and families closer. That means fairer prices at the shore, fresher fish at home, and a supply chain you can feel good about.</p>
            <Link className="btn btn-outline-light" to="/about">Meet our way of doing things <i className="bi bi-arrow-up-right ms-2" /></Link>
          </div>
          <div className="story-stats"><div><strong>100%</strong><span>source traceable</span></div><div><strong>24 hr</strong><span>coast to kitchen</span></div><div><strong>0</strong><span>middlemen in the way</span></div></div>
        </div>
      </section>

      <section className="section-space container-xl">
        <SectionHeading eyebrow="JUST IN FROM THE COAST" title="Fresh off the boat" description="Small-batch, seasonal, and here for a good time—not a long time." link="/shop" linkLabel="See what's new" />
        <ProductGrid products={freshCatch} />
      </section>

      <section className="offer-section">
        <div className="offer-image" />
        <div className="container-xl offer-content">
          <span className="eyebrow">A LITTLE SOMETHING TO GET STARTED</span>
          <h2>Make room<br />for <em>something</em> good.</h2>
          <p>Discover fresh catch, good people, and a more thoughtful route from coast to kitchen.</p>
          <Link className="btn btn-dark-green" to="/contact">Ask about today's catch <i className="bi bi-arrow-up-right ms-2" /></Link>
        </div>
      </section>

      <section className="testimonial-section section-space">
        <div className="container-xl testimonial-inner">
          <span className="eyebrow">KIND WORDS, FRESH FROM OUR CUSTOMERS</span>
          <div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div>
          <blockquote>“The pomfret was so fresh it reminded me of fish my dad used to bring home from the coast. I love knowing exactly where it came from.”</blockquote>
          <div className="testimonial-author"><span className="avatar">AM</span><span><strong>Ananya M.</strong><small>Home cook in Bengaluru</small></span></div>
          <div className="testimonial-pagination"><span className="active" /><span /><span /></div>
        </div>
      </section>
    </>
  );
}

export default Home;
