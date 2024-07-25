// import React, { useState, useEffect } from "react";
// import "../components_css/Login.css";
// import { useNavigate } from "react-router-dom";
// import { Icon } from "react-icons-kit";
// import { eyeOff } from "react-icons-kit/feather/eyeOff";
// import { eye } from "react-icons-kit/feather/eye";

// const Login = ({ toggleForm }) => {
//   useEffect(() => {
//     // Example to change body class only for sign up page
//     document.body.className = "login-body";
//     return () => {
//       document.body.className = ""; // Clean up on unmount
//     };
//   }, []);
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   const [type, setType] = useState("password");
//   const [icon, setIcon] = useState(eyeOff);

//   const [error, setError] = useState("");

//   let navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData({ ...loginData, [name]: value });
//   };

//   const handleToggle = () => {
//     if (type==='password'){
//        setIcon(eye);
//        setType('text')
//     } else {
//        setIcon(eyeOff)
//        setType('password')
//     }
//  }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: loginData.email,
//           password: loginData.password,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Login failed");
//       }

//       const json = await response.json();
//       console.log(json);

//       if (json.success) {
//         localStorage.setItem("token", json.authtoken);
//         localStorage.setItem("username", json.user.username);
//         navigate("/home");
//       } else {
//         setError(json.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setError("Login failed");
//     }
//   };

//   return (
//     <div className="login-container container">
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={loginData.email}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <input
//             type={type}
//             name="password"
//             placeholder="Password"
//             value={loginData.password}
//             onChange={handleInputChange}
//             required
//           />
//            <span class="flex justify-around items-center" onClick={handleToggle}>
//                   <Icon class="absolute mr-10" icon={icon} size={25}/>
//             </span>
//         </div>
//         {error && <p className="error-message">{error}</p>}
//         <button type="submit">Login</button>
//       </form>
//       <p onClick={toggleForm} className="toggle-form">
//         Don't have an account? Register
//       </p>
//     </div>
//   );
// };

// export default Login;



// import React, { useState, useEffect } from "react";
// import "../components_css/Login.css";
// import { useNavigate } from "react-router-dom";
// import { Icon } from "react-icons-kit";
// import { eyeOff } from "react-icons-kit/feather/eyeOff";
// import { eye } from "react-icons-kit/feather/eye";

// const Login = ({ toggleForm }) => {
//   useEffect(() => {
//     // Example to change body class only for sign up page
//     document.body.className = "login-body";
//     return () => {
//       document.body.className = ""; // Clean up on unmount
//     };
//   }, []);
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   const [type, setType] = useState("password");
//   const [icon, setIcon] = useState(eyeOff);

//   const [error, setError] = useState("");
//   const [showResetForm, setShowResetForm] = useState(false);

//   let navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData({ ...loginData, [name]: value });
//   };

//   const handleToggle = () => {
//     if (type==='password'){
//        setIcon(eye);
//        setType('text')
//     } else {
//        setIcon(eyeOff)
//        setType('password')
//     }
//  }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: loginData.email,
//           password: loginData.password,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Login failed");
//       }

//       const json = await response.json();
//       console.log(json);

//       if (json.success) {
//         localStorage.setItem("token", json.authtoken);
//         localStorage.setItem("username", json.user.username);
//         navigate("/home");
//       } else {
//         setError(json.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setError("Login failed");
//     }
//   };

//   const handleResetSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/reset-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: loginData.email,
//         }),
//       });

//       const json = await response.json();
//       console.log(json);

//       if (json.success) {
//         setError("Password reset link has been sent to your email.");
//       } else {
//         setError(json.message || "Password reset failed");
//       }
//     } catch (error) {
//       console.error("Password reset error:", error);
//       setError("Password reset failed");
//     }
//   };




//   return (
//     <div className="login-container container">
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={loginData.email}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <input
//             type={type}
//             name="password"
//             placeholder="Password"
//             value={loginData.password}
//             onChange={handleInputChange}
//             required
//           />
//            <span class="flex justify-around items-center" onClick={handleToggle}>
//                   <Icon class="absolute mr-10" icon={icon} size={25}/>
//             </span>
//         </div>
//         {error && <p className="error-message">{error}</p>}
//         <button type="submit">Login</button>
//       </form>
//       <p onClick={toggleForm} className="toggle-form">
//         Don't have an account? Register
//       </p>
//       <p onClick={() => setShowResetForm(true)} className="toggle-form">
//         Forget Password?
//       </p>
//       {showResetForm && (
//         <form onSubmit={handleResetSubmit}>
//           <div>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={loginData.email}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <button type="submit">Send Reset Link</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Login;


import React, { useState, useEffect } from "react";
import "../components_css/Login.css";
import { useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

const Login = ({ toggleForm }) => {
  useEffect(() => {
    // Example to change body class only for sign up page
    document.body.className = "login-body";
    return () => {
      document.body.className = ""; // Clean up on unmount
    };
  }, []);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const [error, setError] = useState("");

  let navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        localStorage.setItem("username", json.user.username);
        navigate("/dashboard");
      } else {
        setError(json.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed");
    }
  };

  return (
    <div className="login-container container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type={type}
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleInputChange}
            required
          />
          <span className="flex justify-around items-center" onClick={handleToggle}>
            <Icon className="absolute mr-10" icon={icon} size={25} />
          </span>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p onClick={toggleForm} className="toggle-form">
        Don't have an account? Register
      </p>
      <p onClick={() => navigate("/reset")} className="toggle-form">
        Forget Password?
      </p>
    </div>
  );
};

export default Login;
