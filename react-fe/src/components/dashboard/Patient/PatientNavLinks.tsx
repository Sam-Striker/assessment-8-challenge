import { Link } from "react-router-dom";

const PatientNavLinks = () => {
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
        <h6>Physicians</h6>
      </Link>
      <Link
        style={{
          fontSize: "22px",
          fontWeight: "100",
          textDecoration: "none",
          color: "gray",
        }}
        to={"/pharmacists"}
      >
        <h6>Pharmacists</h6>
      </Link>


    </>
  );
};

export default PatientNavLinks;
