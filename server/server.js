// Requiring All Packages
require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const createConnection = require("./configs/db.config");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";

// ---------------------- MIDDLEWARE ----------------------
app.use(express.json({ limit: "1000mb" }));
app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:5001"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400,
  })
);
app.use(cookieParser());

// ---------------------- ROUTES ----------------------
app.use("/api/v1", require("./routes/auth.routes"));
app.use("/api/v1/admin", require("./routes/admin.routes"));
app.use("/api/v1/auth",require("./routes/email.routes"))

// ---------------------- STATIC FILES ----------------------
const adminPath = path.join(__dirname, "../admin/dist");
const appPath = path.join(__dirname, "../client/dist");
const uploadPath = path.join(__dirname, "./uploads");

app.use("/admin", express.static(adminPath));
app.use(express.static(appPath));
app.use("/uploads", express.static(uploadPath));

// ---------------------- SPA FALLBACK ----------------------
app.get("/", (req, res) => {
    if (req.originalUrl.startsWith("/admin")) {
        res.sendFile(path.join(adminPath, "index.html"));
    } else {
        res.sendFile(path.join(appPath, "index.html"));
    }
});

// ---------------------- START SERVER ----------------------
if (process.env.NODE_ENV !== "production") console.clear();

createConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log("\n[+] Express Server Running!");
      console.log(`[+] Host: http://${HOST}:${PORT}\n`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });
