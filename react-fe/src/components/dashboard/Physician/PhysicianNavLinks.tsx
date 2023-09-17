import { Link } from "react-router-dom";

const PhysicianNavLinks = () => {
  return (
    <Link
      style={{
        fontSize: "22px",
        fontWeight: "100",
        textDecoration: "none",
        color: "gray",
      }}
      to={"/dashboard"}
    >
      <h6>patients</h6>
    </Link>
  );
};

export default PhysicianNavLinks;
