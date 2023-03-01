import express from "express";

const PORT = 5000;

const app = express();

app.use(express.json());

app.post("/test-post", (req, res) => {
  console.log("req query ===> ", req.query);
  console.log("req.body ===> ", req.body);
  res.status(200).json("post method works!");
});

app.get("/", (req, res) => {
  res.status(200).json("server works");
});

app.listen(PORT, () => console.log("Server started on port " + PORT));
