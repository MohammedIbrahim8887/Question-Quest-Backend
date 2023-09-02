import express from "express";

const deleteRoutes = express.Router();

deleteRoutes.delete("/", (req, res) => {
  console.log(res.method)
  res.send("This is the PDF DELETE end point");
});

export default  deleteRoutes
