import { Router } from "express";
import { getLikes, postLikes, deleteLikes } from "../controllers/likes.Controller.js";

const likesRouter = Router();

likesRouter.get("/likes/:postId", getLikes);
likesRouter.post("/likes/:postId", postLikes);
likesRouter.delete("/likes/:postId", deleteLikes);

export default likesRouter;