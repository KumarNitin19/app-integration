const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Express app" });
});

const reactProxyConfig = {
  target: "http://localhost:5173",
  changeOrigin: true,
  ws: true,
  secure: false,
  headers: {
    Connection: "keep-alive",
  },
  router: {
    "/": "http://localhost:5173/",
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log("React Proxy Request:", req.method, req.url);
  },
  onError: (err, req, res) => {
    console.error("React Proxy Error:", err);
    res.status(500).send("React Proxy Error");
  },
};

const reactPaths = [
  "/react",
  "/@fs/",
  "/@vite/",
  "/@id/",
  "/node_modules/",
  "/src/",
  "/.vite/",
  "/assets/",
  ".hot-update.json",
  ".hot-update.js",
  ".js",
  ".css",
  ".jsx",
  ".tsx",
  ".ts",
];
app.use(reactPaths, createProxyMiddleware(reactProxyConfig));

// app.use(
//   "/next",
//   createProxyMiddleware({
//     target: "http://localhost:3001",
//     changeOrigin: true,
//     ws: true,
//     router: {
//       "/next": "http://localhost:3001/",
//     },
//     pathRewrite: function (path, req) {
//       if (path.startsWith("/next/")) {
//         return path.replace("/next", "");
//       }
//       return path;
//     },
//     onProxyReq: (proxyReq, req, res) => {
//       console.log("React Proxy Request:", req.method, req.url);
//     },
//     onError: (err, req, res) => {
//       console.error("React Proxy Error:", err);
//       res.status(500).send("React Proxy Error");
//     },
//   })
// );

const port = 3000;

app.listen(port, () => {
  console.log("Listening to port:", port);
});
