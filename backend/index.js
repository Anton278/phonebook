import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routers/authRouter.js";
import contactsRouter from './routers/contactsRouter.js'
import errorMiddleware from "./middlewares/errorMiddleware.js";

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/auth", authRouter);
app.use("/contacts", contactsRouter);
app.use(errorMiddleware);

async function startApp() {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log("Server started on port " + PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();
