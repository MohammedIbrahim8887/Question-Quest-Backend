import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser"; // Add this line to parse JSON request bodies
dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

// GET endpoint
app.get("/api/getData", (req, res) => {
  res.json({ message: "This is a GET request." });
});

// POST endpoint
app.post("/api/postData", (req, res) => {
  // Access the POST data from req.body
  const postData = req.body;

  // Replace this with your desired response
  res.json({ message: "This is a POST request.", data: postData });
});
