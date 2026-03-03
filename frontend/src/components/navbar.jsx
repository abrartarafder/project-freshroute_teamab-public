// Navbar.jsx
import React, { useState } from "react";
import { Navbar, Nav, Container, Form, InputGroup } from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaMapMarkerAlt } from "react-icons/fa";
import "./Navbar.css";
import logo from "../assets/logo_clear.png";

export default function AppNavbar({
  userName = "John",
  activeKey = "home",
  onSearch = () => {},
  cartCount = 0,
  showSearch = true,
  showLocationPicker = false,
  onLocationChange = () => {},
  searchPlaceholder = "Search groceries",
}) {
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("Toronto, ON");

  return (
    <Navbar expand="lg" className="fr-navbar" variant="dark">
      <Container fluid className="fr-container">
        {/* Logo */}
        <Navbar.Brand href="/" className="fr-brand">
          <img src={logo} alt="FreshRoute" className="fr-logo" />
        </Navbar.Brand>

        {showSearch ? (
          <div className="fr-search-wrap">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                onSearch(searchText);
              }}
            >
              <InputGroup className="fr-search">
                <Form.Control
                  name="q"
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder}
                  className="fr-search-input"
                  value={searchText}
                  onChange={(e) => {
                    const next = e.target.value;
                    setSearchText(next);
                    onSearch(next);
                  }}
                />
                <InputGroup.Text className="fr-search-icon">
                  <FaSearch />
                </InputGroup.Text>
              </InputGroup>
            </Form>
          </div>
        ) : showLocationPicker ? (
          <div className="fr-location-wrap">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                onLocationChange(location);
              }}
            >
              <InputGroup className="fr-location">
                <InputGroup.Text className="fr-location-icon">
                  <FaMapMarkerAlt />
                </InputGroup.Text>
                <Form.Control
                  name="location"
                  placeholder="Enter city or ZIP"
                  aria-label="Enter city or ZIP"
                  className="fr-location-input"
                  value={location}
                  onChange={(e) => {
                    const next = e.target.value;
                    setLocation(next);
                  }}
                  onBlur={() => onLocationChange(location)}
                />
                <InputGroup.Text className="fr-location-pill">
                  Delivering to
                </InputGroup.Text>
              </InputGroup>
            </Form>
          </div>
        ) : (
          <div className="fr-search-spacer" aria-hidden />
        )}

        <Navbar.Toggle aria-controls="fr-navbar-nav" className="fr-toggle" />

        <Navbar.Collapse id="fr-navbar-nav">
          <Nav className="fr-nav ms-auto" activeKey={activeKey}>
            <Nav.Link href="/" eventKey="home" className="fr-link">
              Home
            </Nav.Link>
            <Nav.Link href="/organic" eventKey="organic" className="fr-link">
              Organic
            </Nav.Link>
            <Nav.Link
              href="/ethically-raised"
              eventKey="ethically"
              className="fr-link"
            >
              Ethically Raised
            </Nav.Link>
            <Nav.Link href="/recipes" eventKey="recipes" className="fr-link">
              Recipes
            </Nav.Link>

            <Nav.Link href="/cart" eventKey="cart" className="fr-cart">
              <div className="fr-cart-wrap">
                <FaShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="fr-cart-badge">{cartCount}</span>
                )}
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <div className="fr-welcome ms-3">Welcome {userName}!</div>
      </Container>
    </Navbar>
  );
}
