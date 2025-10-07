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

//Implement routes
app.get("/memes", (req, res) => {
  res.json(memes);
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

