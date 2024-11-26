const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Express app" });
});

const port = 3000;

app.listen(port, () => {
  console.log("Listening to port:", port);
});

// Not using this code
// const reactProxyConfig = createProxyMiddleware({
//   target: "http://localhost:5173",
//   changeOrigin: true,
//   ws: true,
//   secure: false,
//   followRefirects: true,
//   pathRewrite: (path, req) => {
//     console.log(path, "2");
//     return path;
//   },
//   onProxyReq: (proxyReq, req, res) => {
//     proxyReq.removeHeader("x-forwarded-host");
//     proxyReq.removeHeader("x-forwarded-proto");
//     console.log("React Proxy Request:", req.method, req.url);
//   },
//   onError: (err, req, res) => {
//     console.error("React Proxy Error:", err);
//     res.status(500).send("React Proxy Error");
//   },
// });

// app.use(
//   ["/react", "/@vite/*", "/src/*", "/@reat-refresh", "/node_modules/*"],
//   reactProxyConfig
// );
