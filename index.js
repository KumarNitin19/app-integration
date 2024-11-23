const express = require("express");
const path = require("path");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";

const app = express();
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

app.use(
  "/",
  express.static(path.join(__dirname, "/frontend/react-app-integartion/dist"))
);

nextApp.prepare().then(() => {
  app.all("*", (req, res) => {
    return handle(req, res);
  });
});

const port = 3000;

app.listen(port, () => {
  console.log("Listening to port:", port);
});
