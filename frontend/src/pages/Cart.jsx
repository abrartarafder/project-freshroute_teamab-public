import AppNavbar from "../components/navbar.jsx";
import logo from "../assets/logo_clear.png";
import "./Landing.css";

export default function Cart() {
  return (
    <div className="page-shell">
      <div className="page-main">
        <AppNavbar userName="John" activeKey="cart" />
      </div>
      <footer className="footer">
        <div className="container footer-container">
          <img src={logo} alt="FreshRoute Logo" className="footer-logo" />
        </div>
      </footer>
    </div>
  );
}
