import { Router } from "express";
import { logout } from "../controllers/auth.Controller.js";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { signup, signin } from "../controllers/auth.Controller.js";
import signinSchema from "../schemas/signin.schema.js";
import signupSchema from "../schemas/signup.schema.js";
import urlMetaData from "url-metadata";

const authRouter = Router();

authRouter.post('/signup', schemaValidation(signupSchema), signup);

authRouter.post('/signin', schemaValidation(signinSchema), signin);

authRouter.delete('/logout', logout);

authRouter.get('/teste', teste)

export default authRouter;

async function teste(req, res) {
    const linkInfo = { title: "", url: "", image: "", description: "" };

    try {
       await urlMetaData("https://www.youtube.com/").then(
          function (metadata) {
            console.log(metadata);
            linkInfo.title = metadata.title;
            linkInfo.url = metadata.url;
            linkInfo.image = metadata.image;
            linkInfo.description = metadata.description;
          },
          function (error) {
            console.log(error);
          }
        );
        res.send(linkInfo).status(200);
    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}