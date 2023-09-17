import authRouter from "./authRoutes";
import patientRouter from "./patientRoutes";
import pharmacistRouter from "./pharmacistRoutes";
import physicianRouter from "./physicianRoutes";

const express = require("express");

const router = express.Router();

router.use("/auth", authRouter)
router.use("/patient", patientRouter);
router.use("/physician", physicianRouter);
router.use("/pharmacist", pharmacistRouter);



export default router;
