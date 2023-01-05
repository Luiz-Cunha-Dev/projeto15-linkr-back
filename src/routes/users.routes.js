import { Router } from "express";
import { getUsers } from "../controllers/users.Controller.js";

const usersRouter = Router();

usersRouter.get("/users/:id", getUsers);

export default usersRouter;
