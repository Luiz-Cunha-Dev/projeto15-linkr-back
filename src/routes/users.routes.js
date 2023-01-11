import { Router } from "express";
import { getUserData, getUsers } from "../controllers/users.Controller.js";

const usersRouter = Router();

usersRouter.post("/users", getUsers);

usersRouter.get("/users/me", getUserData);

export default usersRouter;
