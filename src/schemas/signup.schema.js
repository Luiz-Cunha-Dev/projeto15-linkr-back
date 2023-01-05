import Joi from "joi";

const signupSchema = Joi.object({
   username: Joi.string().required().max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    pictureUrl: Joi.string().required()
})

export default signupSchema;