const express = require("express");
// const { createProxyMiddleware } = require("http-proxy-middleware");
const cookieParser = require("cookie-parser");

const app = express();

// Configure CORS to allow requests from specific origins
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from this origin (frontend)
  credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));

// Middleware to parse cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Express app" });
});

app.get("/set-cookie", (req, res) => {
  // Set a cookie named 'user' with value 'john_doe'
  res.cookie("id_token", "nsddkjnkkjfndkjnnvkjdfnvkjdfknn", {
    httpOnly: true, // Makes the cookie accessible only via HTTP(S), not JavaScript
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production (requires HTTPS)
    maxAge: 3600000, // 1 hour expiration time
    sameSite: "Strict", // Cookie will only be sent in a first-party context (no cross-site)
  });

  res.send("Cookie has been set!");
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
