import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <header className="footer">
      <nav>
        <ul>
          <li>
            <Link to="/">About Us</Link>
          </li>
          <li>
            <Link to="/">footer</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Footer;
