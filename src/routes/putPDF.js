import express from "express";

const putRoutes = express.Router();

putRoutes.put("/", (req, res) => {
  res.send("This is the PDF PUT end point");
});

export default  putRoutes;
