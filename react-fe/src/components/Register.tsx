/* eslint-disable jsx-a11y/alt-text */
import { Link, useNavigate } from "react-router-dom";
import lockSvg from "../assets/lock.svg";
import eyeSvg from "../assets/eye.svg";
import { useState } from "react";
import swal from "sweetalert2";
import axios from "axios";
import "../styles/style.scss";

const Register = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(1);
  const [role, setRole] = useState("");
  const [userData, setUserData] = useState({});

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(userData);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/register",
        {...userData, role},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      res.data.error
        ? swal.fire("Failed!", res.data.error, "error")
        : swal.fire("Success", res.data.message, "success");
      res.data.message.includes("registered successfully!") &&
        navigate("/login");
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
      <form onSubmit={handleRegister}>
        <div className="header">
          <h2>Register</h2>
          <p>
            Already signed up?{" "}
            <Link to="/login" className="link">
              Login
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
                      Register
                    </button>
                  </div>}
                </div>
              ))
            }
          </div>
          </>
        )}

        {toggle === 2 && (
          <>
            <div className="input">
              <input
                type="text"
                placeholder="Enter your full names"
                onChange={(e) => {
                  setUserData({ ...userData, fullNames: e.target.value });
                  // console.log(userData)
                }}
                required
              />
            </div>
            {role === "Patient" && (
              <div className="input">
                <input
                  type="text"
                  placeholder="Enter your username"
                  onChange={(e) => {
                    setUserData({ ...userData, username: e.target.value });
                  }}
                  required
                />
              </div>
            )}
            {role === "Physician" && (
              <div className="input">
                <input
                  type="email"
                  placeholder="Your Email address"
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                  required
                />
              </div>
            )}{" "}
            {role === "Pharmacist" && (
              <div className="input">
                <input
                  type="text"
                  placeholder="Your phone number"
                  onChange={(e) => {
                    setUserData({ ...userData, phone: e.target.value });
                  }}
                  required
                />
              </div>
            )}
            <div className="input password-input">
              <input
                type="password"
                placeholder="Create a password"
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                }}
                required
              />
            </div>
            <div className="input">
              <input
                type="number"
                placeholder="Enter your age"
                onChange={(e) => {
                  setUserData({ ...userData, age: e.target.value });
                }}
                required
              />
            </div>
            <div className="radioContainer">
              <div className="radio">
                <input
                  name="gender"
                  type="radio"
                  value="Male"
                  // defaultChecked
                  onChange={(e) => {
                    setUserData({ ...userData, gender: e.target.value });
                  }}
                  required
                />
                <p>Male</p>
              </div>
              <div className="radio">
                <input
                  name="gender"
                  type="radio"
                  value="Female"
                  onChange={(e) => {
                    setUserData({ ...userData, gender: e.target.value });
                  }}
                  required
                />
                <p>Female</p>
              </div>
            </div>
            <div className="btn-container">
              <div className="lock">
                <img src={lockSvg} />
              </div>
              <button className="submit-btn" type="submit">
                Sign up
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
