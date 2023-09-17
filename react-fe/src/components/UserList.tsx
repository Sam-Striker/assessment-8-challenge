/* eslint-disable jsx-a11y/alt-text */
import userPic from "../assets/user.png";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

const UserList = () => {
  const [users, setUsers] = useState([]);

  let navigate = useNavigate();
  useEffect(() => {
    const bearer_token = localStorage
      .getItem("userToken")
      ?.replace(/['"]+/g, "");

    if (bearer_token) {
      const getUsers = async () => {
        const res = await fetch("http://localhost:4000/api/users", {
          method: "GET",
          credentials: "include",
          headers: {
            authorization: `Bearer ${bearer_token.replaceAll('^"|"$', "")}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setUsers(data.payload);
      };

      getUsers();
    }
  }, []);

  let usersCsv: any = [["First name", "Last name", "Email", "Role"]];
  users.forEach((user: any) => {
    user = [user.firstName, user.lastName, user.email, user.role];
    usersCsv.push(user);
  });
  const csvData = usersCsv;

  return (
    <>
      <div
        className="table-wrapper"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.8rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "30px",
          }}
        >
          <Link
            style={{
              fontSize: "22px",
              fontWeight: "100",
              textDecoration: "none",
              color: "gray",
            }}
            to={"/"}
          >
            <h4>data</h4>
          </Link>
          <Link
            style={{
              fontSize: "22px",
              fontWeight: "100",
              textDecoration: "none",
              color: "gray",
            }}
            to={"/users"}
          >
            <h4>users</h4>
          </Link>
        </div>

        <Button
          className="btn logout-btn"
          onClick={() => {
            localStorage.removeItem("userToken");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </div>
      <div className="userList">
        <header style={{display: "flex", justifyContent:"space-around"}}>
          <h1>Users List</h1>
          {/* <Button className="btn"> */}
            <CSVLink
              data={csvData}
              filename="users.csv"
              target="_blank"
              style={{ textDecoration: "none", color: "brown", fontWeight: "bold" }}
            >
              Export to csv
            </CSVLink>
          {/* </Button> */}
        </header>
        <div className="usersContainer">
          {users.map((user: any) => {
            return (
              <div className="user" key={user.id}>
                <div className="image">
                  <img src={userPic}></img>
                </div>
                <div className="desc">
                  <h2>
                    {user.firstName} {user.lastName}
                  </h2>
                  <p>{user.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UserList;
