import { Router } from "express";
import { logout } from "../controllers/auth.Controller.js";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { signup, signin } from "../controllers/auth.Controller.js";
import signinSchema from "../schemas/signin.schema.js";
import signupSchema from "../schemas/signup.schema.js";
import urlMetaData from "url-metadata";

const authRouter = Router();

authRouter.post("/signup", schemaValidation(signupSchema), signup);

authRouter.post("/signin", schemaValidation(signinSchema), signin);

authRouter.delete("/logout", logout);

export default authRouter;
