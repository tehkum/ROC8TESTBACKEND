import express from "express";
import { config } from "dotenv";
import cors from "cors";

import { connectDB } from "./db/dbconfig.js";
import pipeline from "./routes/pipeline.route.js";
import auth from "./routes/auth.route.js";

config();
connectDB();

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/data", pipeline);
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.send("server is running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
