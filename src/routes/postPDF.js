import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import express from "express";
import multer from "multer";

const postRoutes = express.Router();
const upload = multer({ dest: "uploads/" });

postRoutes.post("/", upload.single("files"), async (req, res) => {
  console.log(req.file);
  const loader = new PDFLoader(req.file.path, {
    splitPages: false,
  });
  const docs = await loader.load();
  const data = docs.map((doc) => doc.pageContent.split("\n"));

  const concatenatedString = data.flat().join(" ");
  res.status(200).send(concatenatedString);
});

export default postRoutes;
