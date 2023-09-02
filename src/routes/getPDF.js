import express from "express";

const getRoutes = express.Router();

getRoutes.get("/", (req, res) => {
  res.send("This is the PDF GET end point");
});

export default  getRoutes;
