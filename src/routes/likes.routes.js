import { Router } from "express";
import { getLikes, deleteLikes } from "../controllers/likes.Controller.js";

const likesRouter = Router();

likesRouter.get("/likes/:postId", getLikes);
likesRouter.delete("/likes/:postId", deleteLikes);

export default likesRouter;