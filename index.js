import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import "express-async-errors";
import { corsCofnig, cookieConfig } from "./config/index.js";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3000/",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(cookieParser());

app.listen(5000, (error) => {
  if (error) {
    console.error(error);
    process.exit(-1);
  }
  console.log(`Listening on port 5000`);
});
app.use((req, res, next) => {
  console.log("I am middleware");
  console.log(req.headers);
  next();
});
app.post("/sign-in", async (req, res) => {
  const { password } = req.body;
  console.log(password);

  if (!password) throw new Error("No password provided");
  res.cookie("corstest", password, cookieConfig(24 * 60 * 60 * 1000));
  return res.status(200).json({ message: "Signed in" });
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
