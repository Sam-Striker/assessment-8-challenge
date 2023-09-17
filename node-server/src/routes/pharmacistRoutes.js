import { getMedicines, addMedicine, givePrescription, getPharmacistPatients } from "../controller";
import { protect } from "../middleware/checkAuth";

const express = require("express");

const pharmacistRouter = express.Router();

pharmacistRouter.post("/give-prescription", protect, givePrescription)
pharmacistRouter.post("/add-medicine", protect, addMedicine);
pharmacistRouter.get("/get-medicines", protect, getMedicines);
pharmacistRouter.get("/get-patients", protect, getPharmacistPatients);

export default pharmacistRouter;
