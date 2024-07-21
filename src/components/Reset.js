import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components_css/Login.css";
const Reset = () => {

    useEffect(() => {
        // Example to change body class only for sign up page
        document.body.className = "login-body";
        return () => {
          document.body.className = ""; // Clean up on unmount
        };
      }, []);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    
    setEmail(e.target.value);
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        setSuccess("Password reset link has been sent to your email.");
        setTimeout(() => {
          navigate("/");
        }, 3000); // Redirect to login page after 3 seconds
      } else {
        setError(json.message || "Password reset failed");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setError("Password reset failed");
    }
  };

  return (
    <div className="login-container container">
      <h1>Reset Password</h1>
      <form onSubmit={handleResetSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default Reset;
