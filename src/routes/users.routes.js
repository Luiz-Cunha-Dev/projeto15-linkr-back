import { Router } from "express";
import { getPostByUser, getUserData, getUsers } from "../controllers/users.Controller.js";

const usersRouter = Router();

usersRouter.post("/users", getUsers);

usersRouter.get("/user/:id", getPostByUser);

usersRouter.get("/users/me", getUserData);

export default usersRouter;
