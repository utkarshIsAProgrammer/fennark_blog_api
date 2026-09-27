import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./db/db.js";
import { blogRoutes } from "./routes/blog.routes.js";

const app = express();
const port = process.env.PORT || 5500;

// Extra frontend origins come from the CLIENT_ORIGINS env var (comma-separated,
// see .env.example) so a deployed frontend can connect without code changes.
const envOrigins = (process.env.CLIENT_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Local development origins (Vite dev server + plain server access)
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173", // vite preview
  "http://127.0.0.1:4173",
  ...envOrigins,
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (curl, same-origin via vite proxy, health checks)
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json());
app.use("/api/blogs", blogRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
  });
});
