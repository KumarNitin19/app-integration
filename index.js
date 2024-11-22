const express = require("express");
const path = require("path");

const app = express();

app.use(
  "/",
  express.static(path.join(__dirname, "/frontend/react-app-integartion/dist"))
);

const port = 3000;

app.listen(port, () => {
  console.log("Listening to port:", port);
});
