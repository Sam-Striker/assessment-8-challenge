/* eslint-disable react/jsx-no-undef */
import { FC } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import PhysicianList from "./components/dashboard/Patient/PhysicianList";
import PharmacistList from "./components/dashboard/Patient/PharmacistList";
import Dashboard from "./components/dashboard/Dashboard";
import Medicines from "./components/dashboard/Pharmacist/Medicines";
import PhysicianPatients from "./components/dashboard/Physician/PhysicianPatients";
import PharmacistPatients from "./components/dashboard/Pharmacist/PharmacistPatients";

const App: FC = () => {
  const RequireAuth = ({ children }: any) => {
    return localStorage.getItem("userToken")?.length &&
      localStorage.getItem("userToken") ? (
      children
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />{" "}
        <Route
          path="/physicians"
          element={
            <RequireAuth>
              <PhysicianList />
            </RequireAuth>
          }
        />
        <Route
          path="/pharmacists"
          element={
            <RequireAuth>
              <PharmacistList />
            </RequireAuth>
          }
        />
        <Route
          path="/medicines"
          element={
            <RequireAuth>
              <Medicines />
            </RequireAuth>
          }
        />
        <Route
          path="/physian-patients"
          element={
            <RequireAuth>
              <PhysicianPatients />
            </RequireAuth>
          }
        />
        <Route
          path="/pharmacist-patients"
          element={
            <RequireAuth>
              <PharmacistPatients />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
