import { Router } from "express";
import { getUser, login, register } from "../controllers/auth.controller.js";
import { verifyUserAuth } from "../middlewares/auth.js";

const app = Router();

app.post("/login", login);
app.post("/signup", register);
app.post("/", verifyUserAuth, getUser);

export default app;
