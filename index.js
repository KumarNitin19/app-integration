const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Express app" });
});

const port = 3000;

app.listen(port, () => {
  console.log("Listening to port:", port);
});
