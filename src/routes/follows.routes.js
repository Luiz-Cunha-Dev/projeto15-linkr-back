import { Router } from "express";
import {  follow, getFollow, unfollow } from "../controllers/follows.Controller.js";

const followsRouter = Router();

followsRouter.get("/follows/:id", getFollow);

followsRouter.post("/follows/:id", follow);

followsRouter.delete("/follows/:id", unfollow);

export default followsRouter;
