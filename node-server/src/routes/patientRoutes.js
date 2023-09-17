import {
  getPharmacists,
  getPhysicians,
  selectPharmacist,
  selectPhysician,
  getPatient
} from "../controller";
import { protect } from "../middleware/checkAuth";

const express = require("express");

const patientRouter = express.Router();

patientRouter.get("/get-physicians", getPhysicians);
patientRouter.get("/get-pharmacists", getPharmacists);
patientRouter.get("/get", protect, getPatient);

patientRouter.post("/select-physician", protect, selectPhysician);
patientRouter.post("/select-pharmacist", protect, selectPharmacist);

export default patientRouter;
