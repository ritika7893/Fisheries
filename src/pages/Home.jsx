import React, { useEffect } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Truck,
  ShieldCheck,
  TrendingUp,
  PackageCheck,
  Fish,
  Waves,
  Snowflake,
  IndianRupee,
  Clock3,
  ThermometerSnowflake,
  Handshake,
  Droplets,
  BadgeCheck,
} from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./Home.css";

const fishCatalog = [
  {
    name: "Rohu",
    scientific: "Labeo rohita",
    type: "Freshwater favourite",
    detail:
      "A popular Indian major carp, commonly traded for retail and bulk markets.",
    image:
      "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=900&q=85",
    tags: ["Farm raised", "Bulk supply"],
  },
  {
    name: "Catla",
    scientific: "Catla catla",
    type: "Freshwater carp",
    detail:
      "Known for its sizeable profile and demand across regional fish markets.",
    image:
      "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?auto=format&fit=crop&w=900&q=85",
    tags: ["Fresh catch", "Wholesale"],
  },
  {
    name: "Common Carp",
    scientific: "Cyprinus carpio",
    type: "Cultured freshwater",
    detail:
      "A widely cultivated species suited to organised pond and farm supply.",
    image:
      "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=900&q=85",
    tags: ["Aquaculture", "Graded lots"],
  },
  {
    name: "Tilapia",
    scientific: "Oreochromis spp.",
    type: "Farm raised",
    detail:
      "A versatile aquaculture fish with consistent demand from food businesses.",
    image:
      "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=900&q=85",
    tags: ["Farm raised", "Scheduled harvest"],
  },
];

const steps = [
  [
    "01",
    "Register & get verified",
    "Farmers, hatcheries, dam farmers and river contractors create a supplier profile with their source and location.",
    Fish,
  ],
  [
    "02",
    "Publish a fish lot",
    "Add species, grade, quantity, expected price, harvest date and freshness duration for every available lot.",
    PackageCheck,
  ],
  [
    "03",
    "Review & negotiate",
    "Inventory managers compare supply, send counteroffers and record each step until both parties agree.",
    Handshake,
  ],
  [
    "04",
    "Schedule cold-chain pickup",
    "Confirm the deal, assign a delivery partner and coordinate pickup, transport and delivery updates.",
    Truck,
  ],
];

export default function Home({ onLogin, onRegister }) {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      <Navbar onLogin={onLogin} onRegister={onRegister} />

      <section className="hero" id="home">
        <div className="hero-copy reveal">
          <div className="eyebrow">
            <span /> THE CONNECTED FISHERIES MARKETPLACE
          </div>
          <h1>
            Fresh from the
            <br />
            <em>water.</em> Fair to
            <br />
            the people.
          </h1>
          <p>
            AquaTrade brings fish farmers, hatcheries, dam farmers, river
            contractors and buyers into one transparent supply network — from
            the first listing to the final delivery.
          </p>
          <div className="hero-actions">
            <button onClick={onRegister}>
              Join the marketplace <ArrowRight size={17} />
            </button>
            <a href="#how">
              See how it works <span>↗</span>
            </a>
          </div>
          <div className="hero-proof">
            <div className="proof-avatars">
              <i>FF</i>
              <i>HC</i>
              <i>RC</i>
              <i>+</i>
            </div>
            <div>
              <b>One network for every source</b>
              <small>Fair pricing · Traceable supply · Fresher delivery</small>
            </div>
          </div>
        </div>
        <div className="hero-visual reveal">
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=1400&q=90"
              alt="Fresh fish displayed at a seafood market"
            />
            <div className="hero-photo-shade" />
            <div className="floating-tag tag-top">
              <span className="pulse" /> FRESHNESS TRACKING
            </div>
            <div className="floating-tag tag-bottom">
              <div className="cold-icon">
                <Snowflake size={17} />
              </div>
              <div>
                <b>Cold-chain coordination</b>
                <small>Pickup to delivery visibility</small>
              </div>
              <CheckCircle2 size={18} color="#14a58d" />
            </div>
          </div>
          <div className="hero-stamp">
            <Waves size={24} />
            <b>
              FROM SOURCE
              <br />
              TO MARKET
            </b>
          </div>
        </div>
        <div className="hero-bottom">
          <span>BUILT FOR THE COMPLETE FISHERIES VALUE CHAIN</span>
          <div>
            <i /> TRANSPARENT TRADE <i /> QUALITY FOCUS <i /> RESPONSIBLE
            SOURCING
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div>
          <b>One connected ecosystem</b>
          <span>
            Purpose-built for every link in the fisheries value chain.
          </span>
        </div>
        <strong>
          <Fish /> FARMERS
        </strong>
        <strong>
          <Waves /> HATCHERIES
        </strong>
        <strong>
          <PackageCheck /> INVENTORY
        </strong>
        <strong>
          <Truck /> LOGISTICS
        </strong>
      </section>

      <section className="section intro-section" id="about">
        <div className="section-kicker">A BETTER WAY TO TRADE</div>
        <div className="intro-grid reveal">
          <h2>
            Good fish deserves
            <br />
            <span>a better journey.</span>
          </h2>
          <div>
            <p>
              Our platform digitises the fisheries supply chain to connect
              producers directly with organised buyers. Suppliers can publish
              availability and negotiate transparently, while inventory teams
              coordinate quality, freshness and movement.
            </p>
            <a href="#services">
              Discover the platform <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="benefit-grid">
          <article className="reveal">
            <div className="benefit-icon">
              <TrendingUp />
            </div>
            <h3>Fair price discovery</h3>
            <p>
              Compare supplier expectations, offers and counteroffers in one
              transparent negotiation trail.
            </p>
          </article>
          <article className="reveal">
            <div className="benefit-icon">
              <Snowflake />
            </div>
            <h3>Freshness-first handling</h3>
            <p>
              Every lot records harvest timing and freshness duration, helping
              teams spot urgent and expired stock.
            </p>
          </article>
          <article className="reveal">
            <div className="benefit-icon">
              <Truck />
            </div>
            <h3>Coordinated logistics</h3>
            <p>
              Assign delivery personnel, plan pickups and follow transport
              milestones through delivery.
            </p>
          </article>
          <article className="reveal">
            <div className="benefit-icon">
              <ShieldCheck />
            </div>
            <h3>Trusted supply network</h3>
            <p>
              Keep supplier profiles, listing details, deal decisions and
              operational updates together.
            </p>
          </article>
        </div>
      </section>

      <section className="fish-showcase" id="categories">
        <div className="section">
          <div className="section-kicker">EXPLORE FISH CATEGORIES</div>
          <div className="section-heading">
            <div>
              <h2>
                Know the catch.
                <br />
                <span>Plan the supply.</span>
              </h2>
            </div>
            <p>
              Discover common freshwater and aquaculture species. Actual
              availability, grade and quantity are provided by suppliers in each
              listing.
            </p>
          </div>
          <div className="fish-grid">
            {fishCatalog.map((fish, index) => (
              <article className="fish-card reveal" key={fish.name}>
                <div className="fish-card-image">
                  <img
                    src={fish.image}
                    alt={`${fish.name} fish`}
                    loading="lazy"
                  />
                  <span>0{index + 1}</span>
                </div>
                <div className="fish-card-body">
                  <div className="fish-type">{fish.type}</div>
                  <h3>{fish.name}</h3>
                  <i>{fish.scientific}</i>
                  <p>{fish.detail}</p>
                  <div className="fish-tags">
                    {fish.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="catalog-note">
            <Droplets size={15} /> Species shown are illustrative catalogue
            examples. Freshness, grade and supply depend on each submitted lot.
          </p>
        </div>
      </section>

      <section className="section workflow-section" id="how">
        <div className="section-kicker">HOW AQUATRADE WORKS</div>
        <div className="section-heading">
          <h2>
            From supplier listing
            <br />
            to doorstep delivery.
          </h2>
          <p>
            A clear, trackable workflow that keeps suppliers, inventory teams
            and delivery partners aligned.
          </p>
        </div>
        <div className="workflow-layout">
          <div className="workflow-photo reveal">
            <img
              src="https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?auto=format&fit=crop&w=1200&q=85"
              alt="Fishing boats and fishery activity on the water"
              loading="lazy"
            />
            <div className="workflow-photo-caption">
              <Waves />
              <span>
                <b>Source to market</b>
                <small>One coordinated journey</small>
              </span>
            </div>
          </div>
          <div className="steps-grid">
            {steps.map(([n, title, desc, Icon]) => (
              <article className="reveal" key={n}>
                <div className="step-icon">
                  <Icon size={19} />
                </div>
                <div>
                  <b>{n}</b>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="freshness-section" id="services">
        <div className="freshness-inner">
          <div className="freshness-copy reveal">
            <div className="section-kicker">FRESHNESS IS A PRIORITY</div>
            <h2>
              Time matters.
              <br />
              <span>Every hour counts.</span>
            </h2>
            <p>
              Fish lots are time-sensitive. AquaTrade makes freshness duration a
              required part of the listing so inventory teams can prioritise
              stock and plan pickup before quality windows close.
            </p>
            <div className="freshness-points">
              <div>
                <Clock3 />
                <span>
                  <b>Fresh</b>
                  <small>Within the supplier's freshness window</small>
                </span>
              </div>
              <div>
                <ThermometerSnowflake />
                <span>
                  <b>Nearing expiry</b>
                  <small>Needs priority review and movement</small>
                </span>
              </div>
              <div>
                <BadgeCheck />
                <span>
                  <b>Expired</b>
                  <small>Flagged for review, not normal sale</small>
                </span>
              </div>
            </div>
          </div>
          <div className="freshness-visual reveal">
            <img
              src="https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1100&q=85"
              alt="Fresh seafood arranged on ice"
              loading="lazy"
            />
            <div className="freshness-card">
              <Snowflake />
              <div>
                <b>Freshness-led inventory</b>
                <small>Harvest date + duration + status</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="marketplace-band">
        <div className="section marketplace-inner">
          <div className="section-kicker">BUILT FOR EVERY ROLE</div>
          <h2>
            One marketplace.
            <br />
            <span>Many ways to contribute.</span>
          </h2>
          <div className="role-chips">
            <span>Fish farmers</span>
            <span>Hatchery farmers</span>
            <span>Dam farmers</span>
            <span>River contractors</span>
            <span>Inventory managers</span>
            <span>Delivery personnel</span>
            <span>Administrators</span>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div>
          <span>YOUR MARKETPLACE. YOUR MOMENTUM.</span>
          <h2>Make every catch count.</h2>
          <p>
            Join a smarter fisheries network built for transparent trade and
            coordinated delivery.
          </p>
        </div>
        <button onClick={onRegister}>
          Become a partner <ArrowRight size={17} />
        </button>
      </section>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}
