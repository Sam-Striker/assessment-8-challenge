/* eslint-disable jsx-a11y/alt-text */
import { Link, useNavigate } from "react-router-dom";
import lockSvg from "../assets/lock.svg";
import eyeSvg from "../assets/eye.svg";
import swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [toggle, setToggle] = useState(1);
  const [loginInfo, setLoginInfo] = useState({});

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(loginInfo);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        loginInfo,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res);
      localStorage.setItem("userToken", JSON.stringify(res.data.payload));
      res.data.error
        ? swal.fire("Failed!", res.data.error, "error")
        : swal.fire("Success", res.data.message, "success");
      res.data.message.includes("Logged in Successfully!") &&
        navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
      swal.fire(
        "Failed!",
        error.response.data.error
          ? error.response.data.error
          : error.response.data.message,
        "error"
      );
    }
  };
  return (
    <div className="fomContainer">
      <form onSubmit={handleLogin}>
        <div className="header">
          <h2>Login as {role}</h2>
          <p>
            Don't have an account ?{" "}
            <Link to="/register" className="link">
              Register
            </Link>
          </p>
          {toggle === 2 && (
            <p
              className="link"
              onClick={() => {
                setToggle(1);
              }}
            >
              Back
            </p>
          )}
        </div>
        {toggle === 1 && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", margin: "2vh 0vw", flexDirection: "column", width: "100%" }}>
              {
                ["Pharmacist", "Physician", "Patient"].map((_role, index) => (
                  <div key={index} 
                    style={{ 
                      color: "brown",
                      display: "flex",
                      justifyContent: "center", 
                      flexDirection: "column",
                      cursor: "pointer",
                      padding: "20px",
                      width:  role === _role ? "40%" : "30%",
                      background: role === _role ? "beige" : "none",
                      borderRadius: "10px"
                    }}
                    onClick={() => setRole(_role)}>
                    <p>{_role}</p>
                    {role === _role && <div className="btn-container">
                      <button
                        className="submit-btn"
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log(role);
                          setToggle(2);
                        }}>
                        Login
                      </button>
                    </div>}
                  </div>
                ))
              }
            </div>
          </>
        )}

        {toggle === 2 && role === "Patient" && (
          <>
            <div className="input">
              <input
                type="text"
                placeholder="Your Username"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, username: e.target.value });
                }}
                required
              />
            </div>
            <div className="input password-input">
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, password: e.target.value });
                }}
                required
              />
            </div>
            <div className="btn-container">
              <div className="lock">
                <img src={lockSvg} />
              </div>
              <button className="submit-btn" type="submit">
                Login
              </button>
            </div>
          </>
        )}

        {toggle === 2 && role === "Physician" && (
          <>
            <div className="input">
              <input
                type="email"
                placeholder="Your Email address"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, email: e.target.value });
                }}
                required
              />
            </div>
            <div className="input password-input">
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, password: e.target.value });
                }}
                required
              />
            </div>
            <div className="btn-container">
              <div className="lock">
                <img src={lockSvg} />
              </div>
              <button className="submit-btn" type="submit">
                Login
              </button>
            </div>
          </>
        )}

        {toggle === 2 && role === "Pharmacist" && (
          <>
            <div className="input">
              <input
                type="text"
                placeholder="Your phone number"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, phone: e.target.value });
                }}
                required
              />
            </div>
            <div className="input password-input">
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, password: e.target.value });
                }}
                required
              />
            </div>
            <div className="btn-container">
              <div className="lock">
                <img src={lockSvg} />
              </div>
              <button className="submit-btn" type="submit">
                Login
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
