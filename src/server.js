import express from "express";
import "dotenv/config";
import { connectDB } from "./db/db.js";
import { blogRoutes } from "./routes/blog.routes.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/blogs", blogRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
  });
});
