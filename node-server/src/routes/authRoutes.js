import { login, register } from "../controller";

const express = require("express");

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);

export default authRouter;
