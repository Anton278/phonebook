import express from "express";
import mongoose from "mongoose";

const PORT = 5000;
const DB_URL =
  "mongodb+srv://anton278:marlboroRed278!@cluster0.egjnvtd.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(express.json());

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log("Server started on port " + PORT));
  } catch (e) {}
}

startApp();
