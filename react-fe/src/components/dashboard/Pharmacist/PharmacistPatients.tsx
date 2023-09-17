import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert2";


const PharmacistPatients = () => {
  const bearer_token = localStorage.getItem("userToken")?.replace(/['"]+/g, "");
  const [patients, setPatients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [patientUsername, setpatientUsername] = useState("");
  const [disease, setDisease] = useState("");
  const [medicineName, setmedicineName] = useState("");
  const [medecines, setMedecines] = useState([]);

  useEffect(() => {
    if (bearer_token) {
      const getPatients = async () => {
        const res = await fetch(
          "http://localhost:4000/api/pharmacist/get-patients",
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${bearer_token.replaceAll('^"|"$', "")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        setPatients(data.payload);
      };
      getPatients();
      console.log(patients);
    }
  }, []);

  useEffect(() => {
    if (bearer_token) {
      const getMedecines = async () => {
        const res = await fetch(
          "http://localhost:4000/api/pharmacist/get-medicines",
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${bearer_token.replaceAll('^"|"$', "")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        setMedecines(data.payload);
      };
      getMedecines();
      console.log(medecines);
    }
  }, []);

  const handleGivePrescription = async () => {
    try {
      if (bearer_token) {
        const res = await axios.post(
          "http://localhost:4000/api/pharmacist/give-prescription",
          { patientUsername, disease, medicineName },
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

  return (
    <>
      <div className="userList margin-auto">
        <header style={{ display: "flex", justifyContent: "space-around" }}>
          <h1>A list of your patients who have consultation</h1>
        </header>
        {patients.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Full names</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Disease</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient: any) => {
                return (
                  <tr key={patient.username}>
                    <td>{patient.fullNames}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.consultation.disease}</td>
                    <td>
                      <button
                        className="table-btn"
                        onClick={(e) => {
                          setpatientUsername(patient.username);
                          setDisease(patient.consultation.disease);
                          setModalOpen(true);
                        }}
                      >
                        Give prescription
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h3>No patients found</h3>
        )}
      </div>
      <div className={`madalWraper ${modalOpen ? " " : "hidden"}`}>
        <div className="modal-content">
          <div className="header">
            <div
              className="close"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              X
            </div>
          </div>
          <div className="form">
            <div className="inputWrapper">
              <select
                name="medecines"
                style={{
                  width: "100%",
                  height: "35px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  padding: "0 10px",
                  outline: "none",
                  fontSize: "16px",
                }}
                title="meds"
                onChange={(e) => {
                  setmedicineName(e.target.value);
                }}
                required
              >
                <option>Select Medecine</option>
                {medecines.length > 0 &&
                  medecines.map((medicine: any) => {
                    console.log(medicine.medName);
                    return (
                      <option value={medicine.medName} key={medicine.medName}>
                        {medicine.medName}
                      </option>
                    );
                  })}
              </select>
            </div>
            <button
              className="submit-btn"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleGivePrescription();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PharmacistPatients;
