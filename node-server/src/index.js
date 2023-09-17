import express from "express";
import cors from "cors";
import "@babel/polyfill";
import router from "./routes/index";

const app = express();

const whitelist = ["http://localhost:3000", "http://localhost:3001"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "404 Route Not Found" });
});

app.listen(4000, console.log(`Server started on port 4000`));

export default app;
