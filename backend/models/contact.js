import mongoose from "mongoose";

const Contact = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

export default mongoose.model("Contact", Contact);
