import React, { useState, useEffect } from 'react';
import '../components_css/Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = ({ toggleForm }) => {
  useEffect(() => {
    // Example to change body class only for sign up page
    document.body.className = "signup-body";
    return () => {
      document.body.className = ""; // Clean up on unmount
    }
  }, []);
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  let navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username : registerData.username,
        email: registerData.email,
        password: registerData.password
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken); 
      navigate("/")
      // localStorage.setItem('username', json.user.username);
    } 
  };

  return (
    <div className="signup-container container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={registerData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={registerData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={registerData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p onClick={toggleForm} className="toggle-form">
        Already have an account? Login
      </p>
    </div>
  );
};

export default Signup;
