import { Router } from "express";
import { createUser }from '../02 controllers/userController';
import { validateSchemaMiddleware } from "../03 middlewares/validateSchema";
import { newUserSchema,logInSchema } from '../schemas/userSchemas';

const userRouter=Router();

userRouter.post('/users/new',validateSchemaMiddleware(newUserSchema),createUser);

export default userRouter