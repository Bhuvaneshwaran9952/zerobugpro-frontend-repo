const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let trainers = []; 

app.post("http://127.0.0.1:8000/trainer", (req, res) => {
  const newTrainer = req.body;
  trainers.push(newTrainer);
  res.status(201).json({ message: "Trainer saved!", trainer: newTrainer });
});

app.listen(3001, () => console.log("Server running on port 3001"));
