const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Express app" });
});

app.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:5173",
    changeOrigin: true,
    ws: true,
    router: {
      "/react": "http://localhost:5173/",
    },
    pathRewrite: function (path, req) {
      if (path.startsWith("/react/")) {
        return path.replace("/react", "");
      }
      return path;
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log("React Proxy Request:", req.method, req.url);
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
