import dotenv from "dotenv";
import express from "express";
import postRoutes from "./src/routes/postPDF.js";
import deleteRoutes from "./src/routes/deletePDF.js";
import putRoutes from "./src/routes/putPDF.js";
import getRoutes from "./src/routes/getPDF.js";

dotenv.config();
const app = express();

const PORT = 4000;
const URL = "http://localhost:";

// Middleware path for the routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use("/postPDF", postRoutes);
app.use("/getPDF", getRoutes);
app.use("/deletePDF", deleteRoutes);
app.use("/putPDF", putRoutes);

app.listen(4000, (req, res) => {
  console.log(`listening for requests on port ${URL}${PORT}`);
});
