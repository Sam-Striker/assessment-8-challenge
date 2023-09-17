/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { CSVLink } from "react-csv";
import axios from "axios";
import swal from "sweetalert2";

const bearer_token = localStorage.getItem("userToken")?.replace(/['"]+/g, "");

const PharmacistList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (bearer_token) {
      const getUsers = async () => {
        const res = await fetch(
          "http://localhost:4000/api/patient/get-pharmacists",
          {
            method: "GET",
            credentials: "include",
            headers: {
              authorization: `Bearer ${bearer_token.replaceAll('^"|"$', "")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        setUsers(data.payload);
      };

      getUsers();
    }
  }, []);

  const [userPrescription, setUserPrescription] = useState({
    disease: "",
    medecine: { medName: "", medPrice: "", expirationDate: "" },
  });
  const [pharmacistPhone, setPharmacistPhone] = useState("");
  useEffect(() => {
    if (bearer_token) {
      const getUser = async () => {
        const res = await fetch("http://localhost:4000/api/patient/get", {
          method: "GET",
          credentials: "include",
          headers: {
            authorization: `Bearer ${bearer_token.replaceAll('^"|"$', "")}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        const prescription = data.payload.prescription;
        const pharmacist = data.payload.selectedPharmacist;
        setPharmacistPhone(pharmacist.phone);

        const medecine = prescription.medicine;
        setUserPrescription({
          disease: data.payload.prescription.disease,
          medecine: {
            medName: medecine.medName,
            medPrice: medecine.medPrice,
            expirationDate: medecine.expirationDate,
          },
        });
      };

      getUser();
    }
  }, []);

  const handleSelectPharmacist = async (pharmacistPhone: string) => {
    try {
      if (bearer_token) {
        const res = await axios.post(
          "http://localhost:4000/api/patient/select-pharmacist",
          { pharmacistPhone },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearer_token.replaceAll('^"|"$', "")}`,
            },
          }
        );
        if (res.data.error) {
          swal.fire("Failed!", res.data.error, "error");
        } else {
          swal.fire("Success", res.data.message, "success");
        }
      }
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

  let prescriptionCsv: any = [
    ["Disease", "Med-name", "Med-price", "expirationDate", "pharmacist-phone"],
  ];
  let data = [
    userPrescription.disease,
    userPrescription.medecine.medName,
    userPrescription.medecine.medPrice,
    userPrescription.medecine.expirationDate,
    pharmacistPhone,
  ];
  prescriptionCsv.push(data);

  const csvData = prescriptionCsv;

  return (
    <>
      <Navbar />
      <div className="page-wraper">
        <div className="userList">
          <header style={{ display: "flex", justifyContent: "space-around" }}>
            <h1>Available Pharmacists</h1>
          </header>
          <table>
            <thead>
              <tr>
                <th>Full Names</th>
                <th>Phone</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => {
                return (
                  <tr key={user.phone}>
                    <td>{user.fullNames}</td>
                    <td>{user.phone}</td>
                    <td>{user.age}</td>
                    <td>{user.gender}</td>
                    <td>
                      <SelectBtn
                        selectHandler={(e: any) => {
                          e.preventDefault();
                          handleSelectPharmacist(user.phone);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="results">
          <div className="result">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ display: "flex" }}>Latest Prescription</h2>
              <CSVLink
                data={csvData}
                filename="prescription.csv"
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "brown",
                  fontWeight: "bold",
                }}
              >
                download prescription
              </CSVLink>
            </div>

            {userPrescription.disease ? (
              <div className="single-item">
                <h3>Disease: {userPrescription.disease}</h3>
                <div>
                  <h3>Medecine: {userPrescription.medecine.medName}</h3>
                  <h3>Price: {userPrescription.medecine.medPrice}</h3>
                  <h4>
                    Expiration Date: {userPrescription.medecine.expirationDate}
                  </h4>
                </div>
                <h3>Pharmacist phone: {pharmacistPhone}</h3>
              </div>
            ) : (
              <h3>No Prescription found yet</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

function SelectBtn(props: any) {
  return (
    <button className="table-btn" onClick={props.selectHandler}>
      Select
    </button>
  );
}

export default PharmacistList;
