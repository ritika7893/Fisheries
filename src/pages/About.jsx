import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-page">
      <section className="about-hero"><div className="about-hero-image" /><div className="container-xl about-hero-copy"><span className="eyebrow eyebrow-light">A MORE THOUGHTFUL SEAFOOD MARKET</span><h1>Closer to the coast.<br /><em>Closer to good.</em></h1><p>We believe great seafood should do more good, for the people who catch it and the people who cook it.</p></div></section>
      <section className="container-xl about-intro section-space"><div className="about-intro-label"><span className="eyebrow">WHY WE'RE HERE</span><h2>A better route<br />from sea to table.</h2></div><div><p>Seafood has always brought people together. But somewhere along the way, the path from the boat to the kitchen got longer, and less fair. We started Tide & Table to make it shorter, clearer and kinder.</p><p>By connecting fishers and fish farmers directly with the people who eat their catch, we bring you fresher seafood and help more value stay with the people who work the water.</p><Link to="/shop" className="text-link">Find your next good thing <i className="bi bi-arrow-up-right ms-2" /></Link></div></section>
      <section className="about-values"><div className="container-xl"><span className="eyebrow eyebrow-light">WHAT WE BELIEVE</span><h2>Good choices, all the way through.</h2><div className="row g-4">
        {[["bi-compass", "Know where it comes from", "Every catch comes with a clear story: who brought it in, where it came from and how it got to you."], ["bi-cash-coin", "Fair means fair", "We keep the route direct, so fishers earn more and you can feel good about every price."], ["bi-snow2", "Freshness is a promise", "A carefully managed cold chain means less waste, better flavour and freshness you can trust."], ["bi-patch-check", "Quality, not guesswork", "Trusted partners, careful handling and honest ratings make every choice a little easier."]].map(([icon, title, copy]) => <div className="col-md-6 col-lg-3" key={title}><div className="value-card"><i className={`bi ${icon}`} /><h3>{title}</h3><p>{copy}</p></div></div>)}
      </div></div></section>
      <section className="container-xl about-bottom section-space"><div className="about-bottom-photo" /><div><span className="eyebrow">BETTER TOGETHER</span><h2>Good for the people.<br /><em>Good for the sea.</em></h2><p>We’re building a more resilient seafood market, one good catch at a time: reducing unnecessary handling, growing access to fair markets, and helping everyone make more informed choices.</p><Link to="/contact" className="btn btn-dark-green">Let’s talk <i className="bi bi-arrow-up-right ms-2" /></Link></div></section>
    </div>
  );
}

export default About;
