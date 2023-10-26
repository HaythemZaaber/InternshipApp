import React, { useState } from "react";
import axios from "axios";
import "./auth.scss";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthComponent = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(props.person);

    try {
      if (isRegistering) {
        // Register user
        const response = await axios.post(`/${props.person}/register`, {
          name,
          email,
          password,
        });

        console.log("Registration successful:", response.data);
        toast.success("Success: Registration successful");
        setIsRegistering(!isRegistering);
        setEmail("");
        setPassword("");
        navigate(`/${props.person}/login`);
      } else {
        // Login user
        const response = await axios.post(`/${props.person}/login`, {
          email,
          password,
        });
        console.log('response', response )
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        navigate(`/${props.person}/dashboard`);
        console.log("Login successful:", response.data);
      }
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("An error occurred: " + error.response.data.error, {
        position: "top-right",
        autoClose: 5000, // Time in milliseconds before the notification closes automatically
        hideProgressBar: false, // Show a progress bar
        closeOnClick: true, // Close the notification when clicked
        pauseOnHover: true, // Pause the auto-close timer when hovering over the notification
        draggable: true, // Allow dragging the notification
        theme: "dark",
      });
    }
  };

  return (
    <div className="authContainer">
      <ToastContainer />
      <div className="container">
        <h2>{isRegistering ? "Register" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isRegistering ? (
            <div>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          ) : (
            ""
          )}

          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="btn">
            <button type="submit">
              {isRegistering ? "Register" : "Login"}
            </button>
          </div>
        </form>
        <p>
          {isRegistering
            ? "Already have an account? "
            : "Don't have an account? "}
          {/* <Link to={`/${props.person}/${isRegistering ? "Login" : "register"}`}> */}
          <span
            onClick={() => {
              setIsRegistering(!isRegistering);
              setEmail("");
              setName("");
              setPassword("");
              navigate(
                `/${props.person}/${!isRegistering ? "register" : "login"}`
              );
            }}
            style={{ cursor: "pointer", color: "blue" }}
          >
            {isRegistering ? "Login" : "Register"}
          </span>
          {/* </Link> */}
        </p>
      </div>
    </div>
  );
};

export default AuthComponent;
