import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routers/authRouter.js";

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/auth", authRouter);

async function startApp() {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log("Server started on port " + PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();
