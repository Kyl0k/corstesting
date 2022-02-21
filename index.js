import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import "express-async-errors";
import { corsCofnig, cookieConfig } from "./config/index.js";

const app = express();
app.use(cors(corsCofnig));
app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT || 5000, (error) => {
  if (error) {
    console.error(error);
    process.exit(-1);
  }
  console.log(`Listening on port ${process.env.PORT}`);
});
app.post("/auth/log-in", async (req, res) => {
  const { password } = req.body;
  if (!password) throw new Error("No password provided");
  res.cookie("corstest", password, cookieConfig(24 * 60 * 60 * 1000));
  return res.status(200).json({ message: "Signed in" });
});

app.delete("/auth/log-out", async (req, res) => {
  res.cookie("corstest", undefined, cookieConfig(-24 * 60 * 60 * 1000));
  return res.status(200).json({ message: "Signed in" });
});

app.get("/", async (req, res) => {
  return res.send("Heroku CORS Kylok");
});

app.get("/cors", async (req, res) => {
  const {
    cookies: { corstest },
  } = req;
  if (!corstest) throw new Error("No cookie provided");
  return res.status(200).json({ cookie: corstest });
});

app.all("*", (req, res) => {
  return res.status(404).json({
    error: "Not found error",
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({ err });
});
