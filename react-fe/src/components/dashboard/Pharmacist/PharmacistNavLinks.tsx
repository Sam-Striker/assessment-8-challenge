import { Link } from "react-router-dom";

const PharmacistNavLinks = () => {
  return (
    <>
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
      <Link
        style={{
          fontSize: "22px",
          fontWeight: "100",
          textDecoration: "none",
          color: "gray",
        }}
        to={"/medicines"}
      >
        <h6>medecines</h6>
      </Link>
    </>
  );
};

export default PharmacistNavLinks;
