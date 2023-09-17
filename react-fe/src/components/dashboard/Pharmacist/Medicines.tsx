/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert2";
import Navbar from "../Navbar";

const Medicines = () => {
  const [medecines, setMedecines]: any[] = useState([]);
  const [medData, setMedData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);


  const bearer_token = localStorage.getItem("userToken")?.replace(/['"]+/g, "");

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

  const handleAddMed = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(medData);
    try {
      if (bearer_token) {
        const res = await axios.post(
          "http://localhost:4000/api/pharmacist/add-medicine",
          medData,
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
          setMedecines([...medecines, medData]);
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
    <div>
      <Navbar />


      <div className="userList margin-auto">
        <header style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Available Medecines</h1>
          <button className="add" onClick={() => setModalOpen(true)}>Add Medecine</button>

        </header>
        <table>
          <tr>
            <th>med-name</th>
            <th>med-price</th>
            <th>expirationDate</th>
          </tr>
          {medecines.map((med: any) => {
            return (
              <tr>
                <td>{med.medName}</td>
                <td>{med.medPrice}</td>
                <td>{med.expirationDate}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className={`madalWraper ${modalOpen ? ' ' : 'hidden'}`} >
        <div className="modal-content">
          <div className="header">
            <div className="close" onClick={() => {
              console.log("NMNMM")
              setModalOpen(false)
            }}>X</div>
          </div>
          <div className="form">
            <form onSubmit={(e) => {
              handleAddMed(e)
              setModalOpen(false)
            }}>
              <div className="header">
                <h2>Add medecines</h2>
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Enter med name"
                  onChange={(e) => {
                    setMedData({ ...medData, medName: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="input">
                <input
                  type="number"
                  placeholder="Enter med price"
                  onChange={(e) => {
                    setMedData({ ...medData, medPrice: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="input">
                <input
                  type="date"
                  placeholder="Enter med name"
                  onChange={(e) => {
                    setMedData({ ...medData, expirationDate: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="btn-container">
                <button className="submit-btn" type="submit">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medicines;
