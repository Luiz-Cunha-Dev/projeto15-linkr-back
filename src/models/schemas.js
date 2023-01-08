import joi from "joi";

export const postsSchema = joi.object({
  link: joi.string().uri().required(),
  comments: joi.string(),
});
