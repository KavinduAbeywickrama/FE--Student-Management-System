import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav>
        <ul>
          
          {/* <li>
            <Link to="/">Details</Link>
          </li> */}
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/AddStudent">Add Student</Link>
          </li>
          <h2>Student Management System</h2>
          
        </ul>
        
      </nav>
    </header>
  );
}

export default Header;
