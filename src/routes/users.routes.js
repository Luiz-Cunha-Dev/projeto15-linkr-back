import { Router } from "express";
import { getUser, getUserData, getUsers } from "../controllers/users.Controller.js";

const usersRouter = Router();

usersRouter.post("/users", getUsers);

usersRouter.get("/user/:id", getUser);

usersRouter.get("/users/me", getUserData);

export default usersRouter;
