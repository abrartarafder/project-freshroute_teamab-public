
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AppNavbar from "../components/navbar.jsx";
import "./Landing.css";
import basketImg from "../assets/landing/baskets.png";
import truckImg from "../assets/landing/truck.png";
import logo from "../assets/logo_clear.png";

export default function LandingPage() {
  const handleSearch = (query) => {
    console.log("Search:", query);
  };

  const benefits = [
    <>
      We deliver farm-direct groceries that stay{" "}
      <span className="accent-green">fresh, nutrient-rich</span>, and are
      handled cold from harvest to your doorstep.
    </>,
    <>
      <span className="accent-gold">Organic</span> produce grown without
      synthetic pesticides, GMOs, or artificial additives.
    </>,
    <>
      <span className="accent-green">Ethically Raised</span> meats and dairy
      sourced from farms with humane, pasture-forward standards.
    </>,
  ];

  return (
    <div className="page-shell">
      <div className="page-main">
        <AppNavbar
          cartCount={9}
          userName="John"
          activeKey="home"
          onSearch={handleSearch}
        />

        {/* Hero Section */}
        <section className="hero-section">
          <Container fluid className="hero-container">
            <Row className="hero-content">
              <Col lg={6} className="hero-text">
                <h1 className="hero-title">
                  Fresh. Organic.
                  <br />
                  Ethically Sourced.
                  <br />
                  Delivered.
                </h1>
              </Col>
              <Col lg={6} className="hero-image">
                <img src={basketImg} alt="Shopping Basket" className="basket-img" />
              </Col>
            </Row>
          </Container>
        </section>

        {/* Why We Are The Best Section */}
        <section className="why-best-section">
          <Container>
            <h2 className="section-title">Why We Are The Best?</h2>

            <Row className="why-best-content">
              <Col lg={6} className="why-best-list">
                {benefits.map((benefit, index) => (
                  <div
                    className={`benefit-item ${index === 0 ? "benefit-item-primary" : ""}`}
                    key={benefit}
                  >
                    <div
                      className={`benefit-dot ${index === 1 ? "gold" : "green"}`}
                    ></div>
                    <p className="benefit-text">{benefit}</p>
                  </div>
                ))}
              </Col>

              <Col lg={6} className="why-best-image">
                <div className="truck-panel">
                  <img src={truckImg} alt="Delivery Truck" className="truck-img" />
                </div>
                <Button className="shop-btn" href="/organic">
                  Shop Fresh Groceries
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <Container className="footer-container">
          <img src={logo} alt="FreshRoute Logo" className="footer-logo" />
        </Container>
      </footer>
    </div>
  );
}
