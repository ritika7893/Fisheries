function Contact() {
  return (
    <div className="contact-page">
      <section className="contact-hero"><div className="container-xl"><span className="eyebrow eyebrow-light">GOOD PEOPLE, JUST A MESSAGE AWAY</span><h1>Let’s have<br />a <em>little chat.</em></h1><p>Questions about your order, our catch, or just what to cook tonight? We’re all ears.</p></div></section>
      <div className="container-xl contact-content"><div className="row g-5"><div className="col-lg-5 contact-info"><span className="eyebrow">HOW TO FIND US</span><h2>Here when you need us.</h2><div className="contact-method"><i className="bi bi-envelope" /><span><strong>Send us a note</strong><a href="mailto:hello@tideandtable.in">hello@tideandtable.in</a></span></div><div className="contact-method"><i className="bi bi-telephone" /><span><strong>Give us a ring</strong><a href="tel:+918001234567">+91 800 123 4567</a></span></div><div className="contact-method"><i className="bi bi-clock" /><span><strong>When we’re around</strong><small>Monday – Saturday, 9am – 6pm IST</small></span></div><div className="contact-promise"><i className="bi bi-info-circle" /><span>This is a static catalogue preview. Email or call us for current product availability and ordering.</span></div></div>
        <div className="col-lg-7"><div className="contact-form"><span className="eyebrow">A REAL PERSON, NOT A FORM</span><h2>We’d love to hear from you.</h2><p>For questions about products, availability, or wholesale enquiries, get in touch directly.</p><a className="btn btn-dark-green" href="mailto:hello@tideandtable.in">Email our team <i className="bi bi-envelope ms-2" /></a></div></div></div></div>
    </div>
  );
}

export default Contact;
