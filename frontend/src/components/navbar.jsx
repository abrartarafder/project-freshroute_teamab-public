// Navbar.jsx
import React from "react";
import { Navbar, Nav, Container, Form, InputGroup } from "react-bootstrap";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import "./Navbar.css";
import logo from "../assets/logo_clear.png";

export default function AppNavbar({
  userName = "John",
  activeKey = "home",
  onSearch = () => {},
}) {
  return (
    <Navbar expand="lg" className="fr-navbar" variant="dark">
      <Container fluid className="fr-container">
        {/* Logo */}
        <Navbar.Brand href="/" className="fr-brand">
          <img src={logo} alt="FreshRoute" className="fr-logo" />
        </Navbar.Brand>

        <div className="fr-search-wrap">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              const q = new FormData(e.currentTarget).get("q")?.toString() ?? "";
              onSearch(q);
            }}
          >
            <InputGroup className="fr-search">
              <Form.Control
                name="q"
                placeholder="Search groceries"
                aria-label="Search groceries"
                className="fr-search-input"
              />
              <InputGroup.Text className="fr-search-icon">
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </Form>
        </div>

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
              <FaShoppingCart size={22} />
            </Nav.Link>

            <div className="fr-welcome">Welcome {userName}!</div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}