import express from "express";
import { CohereEmbeddings } from "langchain/embeddings/cohere";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { RetrievalQAChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

const getRoutes = express.Router();
const embeddings = new CohereEmbeddings({
  apiKey: process.env.COHERE_API_TOKEN,
  batchSize: 96,
});
async function getEmbeddings(chunk) {
  return await embeddings.embedQuery(chunk);
}

getRoutes.get("/", async (req, res) => {
  // await client.connect();
  const loader = new PDFLoader("Prep Questions.pdf", { splitPages: false });
  const text_loader = new TextLoader("abc.txt");
  const text_doc = await text_loader.load();

  const docs = await loader.load();

  const data = docs.map((doc) => doc.pageContent.split("\n"));

  const concatenatedString = data.flat().join(" ");
  // console.log(concatenatedString)

  const splitter = new CharacterTextSplitter({
    separator: " ",
    chunkSize: 15,
    chunkOverlap: 0,
  });

  const output = await splitter.createDocuments([concatenatedString]);
  const vectorStore = await HNSWLib.fromDocuments(text_doc, embeddings);
  console.log("Vector Store:", vectorStore);
  const result = await vectorStore.similaritySearch("Meadowbrook", 1);
  console.log(result);

  const chunks = await Promise.all(
    output.map(async (chunk) => {
      return await getEmbeddings(chunk.pageContent);
    })
  );
  const question = "Multiple choice";
  const amount = 4;
  const template =
    " Use the following pieces of context try to generate questions frist and the amount is provided under and provide the answer key after you provided the questions keep the answers as concise as possible. Note: incase the user inputs a questiontype of Matching display it as a table format.Always say 'thanks for Using Question Quest! © Copyright 2021, All Rights Reserved by Cassiopeia' at the end of response.{context} Question: {question} Amount:{amount}";
  const chain = RetrievalQAChain.fromLLM(ollama, vectorStore.asRetriever());

  const response = await chain.call({
    query: PromptTemplate.fromTemplate(template),
  });

  console.log("Client:", chunks);

  // await client.disconnect();

  res.send(chunks);
});

export default getRoutes;
