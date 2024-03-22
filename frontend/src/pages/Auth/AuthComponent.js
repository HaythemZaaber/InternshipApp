import React, { useState } from "react";
import axios from "axios";
import "./auth.scss";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { KeyIcon, Mail, CreditCardIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/reducers/auth.slice";

const AuthComponent = (props) => {
  const [cin, setCin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(props.person);

    try {
      if (isRegistering) {
        // Register user
        const response = await axios.post(`/${props.person}/register`, {
          cin,
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
        console.log("response", response);
        const token = response.data.token;
        // localStorage.setItem("authToken", token);
        dispatch(setToken(token));
        setTimeout(()=>{

          navigate(`/${props.person}`);
        },2000)
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
              <div className="important">
                <CreditCardIcon size={20} />
                <label>CIN</label>
              </div>
              <input
                type="tel"
                // attribute to remove the up and down arrows from this input
                pattern="[0-9]*"
                // accept only 8 number
                maxLength="8"
                // accept only numbers in this input
                step={1}
                min="0"
                value={cin}
                onChange={(e) => setCin(e.target.value)}
                required
              />
            </div>
          ) : (
            ""
          )}

          <div>
            <div className="important">
              <Mail size={20} />
              <label>Email</label>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="important">
              <KeyIcon size={20} />
              <label>Password</label>
            </div>
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
              setCin("");
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
