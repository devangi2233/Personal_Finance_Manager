import React, { useState, useEffect } from 'react';
import { Link ,useNavigate} from "react-router-dom";

const Navbar = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Retrieve username from localStorage on component mount
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  let navigate = useNavigate();
  const handleLogout =()=>{
    localStorage.removeItem('token')
    navigate("/")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Personal Finance Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/expense">
                Expense
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/income">
                Income
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/budget">
                Budget
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/goal">
                Goal
              </Link>
            </li>
          </ul>
          
          {username  && ( // Check if username is available
            <div className="navbar-text">
             Welcome, {username}!
            </div>
          )}

{!localStorage.getItem('token') ? <form className="d-flex" role="search">
      <Link class="btn btn-primary mx-2" to="/login" role="button">Login</Link>
      <Link class="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link>
      </form>: <button className='btn btn-primary' onClick={handleLogout}>Log Out</button>}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
