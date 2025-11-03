// ---------------------- REQUIRE PACKAGES ----------------------
require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const createConnection = require("./configs/db.config");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

// ---------------------- MIDDLEWARE ----------------------
app.use(express.json({ limit: "1000mb" }));
app.use(
    cors({
        origin: ["http://localhost:5000", "http://localhost:5001"],
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
        maxAge: 86400
    })
);
app.use(cookieParser());

// ---------------------- ROUTES ----------------------
app.use("/api/v1", require("./routes/auth.routes"));
app.use("/api/v1/admin", require("./routes/admin.routes"));
app.use("/api/v1/auth", require("./routes/email.routes"));

// ---------------------- STATIC FILES ----------------------
// Serve built client and admin apps (adjust if needed)
const clientPath = path.join(__dirname, "../client/dist");
const adminPath = path.join(__dirname, "../admin/dist");

app.use("/admin", express.static(adminPath));
app.use(express.static(clientPath));

// ---------------------- SPA FALLBACK (Express 5 SAFE) ----------------------
// Express 5+ now requires RegExp-style catch-alls for wildcard routes

// Admin SPA fallback
app.get(/^\/admin(\/.*)?$/, (req, res) => {
    res.sendFile(path.join(adminPath, "index.html"));
});

// Client SPA fallback
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
});

// ---------------------- START SERVER ----------------------
if (process.env.NODE_ENV !== "production") console.clear();

createConnection()
    .then(() => {
        app.listen(PORT, HOST, () => {
            console.log("\n[+] Express Server Running!");
            console.log(`\n[+] Host: ${HOST}`);
            console.log(`\n[+] Port: ${PORT}\n`);
        });
    })
    .catch(err => {
        console.error("❌ Database connection failed:", err.message);
    });
