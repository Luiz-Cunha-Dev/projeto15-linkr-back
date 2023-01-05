import { Router } from "express";
import { logout } from "../controllers/auth.Controller.js";

const authRouter = Router();

authRouter.delete('/logout', logout);

export default authRouter;
