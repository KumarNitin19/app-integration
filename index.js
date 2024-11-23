const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Express app" });
});

app.use(
  "/react",
  createProxyMiddleware({
    target: "http://localhost:5173",
    changeOrigin: true,
    pathRewrite: {
      "^/react": "",
    },
    onError: (err, req, res) => {
      console.error("React Proxy Error:", err);
      res.status(500).send("React Proxy Error");
    },
  })
);

app.use(
  "/next",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
    pathRewrite: {
      "^/next": "",
    },
    onError: (err, req, res) => {
      console.error("Next Proxy Error:", err);
      res.status(500).send("Next Proxy Error");
    },
  })
);

const port = 3000;

app.listen(port, () => {
  console.log("Listening to port:", port);
});
