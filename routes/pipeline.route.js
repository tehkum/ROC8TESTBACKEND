import { Router } from "express";
import { readExcel } from "../controllers/pipeline.controller.js";
import { verifyUserAuth } from "../middlewares/auth.js";

const app = Router();

// app.use(verifyUserAuth);
app.get("/", readExcel);

export default app;
