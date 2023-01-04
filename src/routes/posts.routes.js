import { Router } from "express";

const postsRouter = Router();

postsRouter.get("/timeline");
postsRouter.post("/timeline");
postsRouter.patch("/timeline");
postsRouter.delete("/timeline");

export default postsRouter;
