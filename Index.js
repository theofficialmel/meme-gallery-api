//Start an Express server
import express from "express";
const app = express();
app.use(express.json()); // JSON body parsing
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//Add in-memory data
let memes = [
  { id: 1, title: "Distracted Boyfriend", url: "https://i.imgur.com/example1.jpg" },
  { id: 2, title: "Success Kid", url: "https://i.imgur.com/example2.jpg" }
];

// Create a logging middleware that runs on every request
function logger(req, res, next) {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
  next();
}
app.use(logger);


//Add a PUT route to update a meme by ID:
app.put("/memes/:id", (req, res) => {
  const { id } = req.params;
  const { title, url } = req.body;
  const meme = memes.find((m) => m.id === parseInt(id));

  if (!meme) {
    return res.status(404).json({ error: "Meme not found" });
  }

  meme.title = title || meme.title;
  meme.url = url || meme.url;

  res.json(meme);
});

//Add a DELETE route to remove a meme by ID:
app.delete("/memes/:id", (req, res) => {
  const { id } = req.params;
  const index = memes.findIndex((m) => m.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "Meme not found" });
  }

  const deleted = memes.splice(index, 1);
  res.json(deleted[0]);
});




//Implement routes
app.get("/memes", (req, res) => {
  res.json(memes);
});

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
 
//updated prisma routes
app.get("/memes", async (req, res) => {
  const memes = await prisma.meme.findMany({ include: { user: true } });
  res.json(memes);
});
// Add a new route to your index.js file:
app.get("/memes/:id", (req, res) => {
  const { id } = req.params;
  const meme = memes.find((m) => m.id === parseInt(id));
  if (!meme) {
    return res.status(404).json({ error: "Meme not found" });
  }
  res.json(meme);
}); 

//Create an error-handling middleware at the bottom of your routes:
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

//Add a test error route to confirm error handling works:
app.get("/error-test", (req, res) => {
  throw new Error("Test error");
});


// POST /memes → add a meme

app.post("/memes", async (req, res) => {
  const { title, url } = req.body; // destructuring
  if (!title || !url) {
    return res.status(400).json({ error: "title and url are required" });
  }
  const newMeme = { id: memes.length + 1, title, url };
  memes.push(newMeme);
  res.status(201).json(newMeme);
});
 














// expressJSDocSwagger(app)({
//   info: {
//     version: "1.0.0",
//     title: "Dev Meme API",
//     description: "Docs for Dev Meme API",
//   },
//   // security: { ApiKeyAuth: { type: "apiKey", in: "header", name: "x-api-key" } },
//   swaggerUIPath: "/docs",
//   baseDir: process.cwd(), // returns the current working directory
//   filesPattern: "./src/routes/**/*.{js,ts}",
//   exposeApiDocs: true,
//   apiDocsPath: "/api-docs.json",
// // });