import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

function Header() {
  const { currency, setCurrency } = CryptoState();
  const navigate = useNavigate();

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  return (
    <Navbar bg="dark" variant="dark"  style={{ boxShadow: "0 8px 4px rgba(0, 0, 0, 0.1)" }}>
      <Container>
        <Navbar.Brand onClick={() => navigate(`/`)} style={{ cursor: "pointer" , fontWeight:"800",fontSize:"35px"}}>
          Crypto Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Add any other navigation links if needed */}
          </Nav>
          <Nav>
            <Nav.Item>
              <Nav.Link onClick={() => handleCurrencyChange("USD")} active={currency === "USD"}>
                USD
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => handleCurrencyChange("PKR")} active={currency === "PKR"}>
                PKR
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
