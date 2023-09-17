import { getPhysicianPatients, giveConsultation } from "../controller";
import { protect } from "../middleware/checkAuth";

const express = require("express");

const physicianRouter = express.Router();

physicianRouter.post("/give-consultation", protect, giveConsultation)
physicianRouter.get("/get-patients", protect, getPhysicianPatients)

export default physicianRouter;
