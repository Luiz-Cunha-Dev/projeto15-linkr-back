import { Router } from "express";
import postsRouter from "./posts.routes.js";
import authRouter from "./auth.routes.js";
import usersRouter from "./users.routes.js";
import likesRouter from "./likes.routes.js";
import followsRouter from "./follows.routes.js";

const router = Router();

router.use(postsRouter);
router.use(authRouter);
router.use(usersRouter);
router.use(likesRouter);
router.use(followsRouter);

export default router;
