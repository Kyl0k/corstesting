import express, { response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { corsCofnig, cookieConfig } from "./config/index.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsCofnig));

app.listen(5000, (error) => {
  if (error) {
    console.error(error);
    process.exit(-1);
  }
  console.log(`Listening on port 5000`);
});

app.post("/sign-in", (req, res) => {
  const { password } = req.body;
  if (!password) throw new Error("No password provided");
  res.cookie("corstest", password, cookieConfig(24 * 60 * 60 * 1000));
  return res.status(200).json({ message: "Signed in" });
});

app.get("/cors", (req, res) => {
  const {
    cookies: { corstest },
    body: { password },
  } = req;
  if (!corstest || !password) throw new Error("No password or cookie provided");
  return res.status(200).json({ message: "Cors allowed to enter" });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({ err });
});
