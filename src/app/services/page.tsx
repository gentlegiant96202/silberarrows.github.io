export default function Services() {
  const services = [
    {
      icon: "fas fa-clipboard-list",
      title: "Scheduled Maintenance – Service A & B",
      description: "Regular servicing is essential to retain your vehicle's efficiency, safety, and long-term value.",
    },
    {
      icon: "fas fa-dot-circle",
      title: "Brake Service & Repair",
      description: "Comprehensive brake inspections, servicing, and repairs using only genuine Mercedes-Benz parts.",
    },
    {
      icon: "fas fa-sync-alt",
      title: "Tyre Replacement & Balancing",
      description: "We supply and fit Mercedes-Benz-approved tyres, including run-flats and AMG-specific sizes.",
    },
    {
      icon: "fas fa-drafting-compass",
      title: "Wheel Alignment",
      description: "Precise wheel alignment for steering accuracy, even tyre wear, and overall vehicle stability.",
    },
    {
      icon: "fas fa-bolt",
      title: "Battery Testing & Replacement",
      description: "Our battery services ensure reliable starts and prevent electrical issues.",
    },
    {
      icon: "fas fa-shield-alt",
      title: "Extended Warranty",
      description: "Comprehensive extended warranty programs for your peace of mind.",
    },
  ];

  return (
    <main className="services-page">
      <section className="services-hero">
        <div className="hero-content">
          <h1 className="hero-title">Our <span>Premium</span> Services</h1>
          <p className="hero-subtitle">
            Specialized Mercedes-Benz solutions delivered with precision and expertise
          </p>
        </div>
      </section>

      <section className="services-detailed">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <i className={service.icon}></i>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button className="contact-btn">
                  <i className="fas fa-phone-alt"></i>
                  Get Quote
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <div className="container">
          <h2>Ready to Service Your Mercedes-Benz?</h2>
          <p>Contact us today for a free consultation and quote</p>
          <div className="cta-buttons">
            <a href="tel:+97143805515" className="cta-btn primary">
              <i className="fas fa-phone-alt"></i>
              Call Now: +971 4 380 5515
            </a>
            <a href="https://wa.me/+97143805515" className="cta-btn secondary">
              <i className="fab fa-whatsapp"></i>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
} 