import { Router } from "express";
import { getPostByUser, getUsers } from "../controllers/users.Controller.js";

const usersRouter = Router();

usersRouter.get("/users", getUsers);

usersRouter.get("/users/:id", getPostByUser);

export default usersRouter;
