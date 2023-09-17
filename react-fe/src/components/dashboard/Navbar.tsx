import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import PatientNavLinks from "./Patient/PatientNavLinks";
import PhysicianNavLinks from "./Physician/PhysicianNavLinks";
import PharmacistNavLinks from "./Pharmacist/PharmacistNavLinks";

const Navbar = () => {
  let navigate = useNavigate();

  const bearer_token: any = localStorage
    .getItem("userToken")
    ?.replace(/['"]+/g, "");

  let user: any = jwt_decode(bearer_token);
  localStorage.setItem("user", JSON.stringify(user));

  return (
    <div
      className="table-wrapper"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0.8rem",
        alignItems: 'center'
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "30px",
        }}
      >
        {user?.role === "Patient" && <PatientNavLinks />}
        {user?.role === "Physician" && <PhysicianNavLinks />}
        {user?.role === "Pharmacist" && <PharmacistNavLinks />}
      </div>

      <Button
        className="btn logout-btn"
        onClick={() => {
          localStorage.removeItem("userToken");
          navigate("/login");
        }}
      >
        Logout {user?.role}
      </Button>
    </div>
  );
};

export default Navbar;
