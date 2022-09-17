import { Router } from "express";
import { createUser }from '../controllers/userController';
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { newUserSchema,logInSchema } from '../schemas/userSchemas';

const userRouter=Router();

userRouter.post('/users/new',validateSchemaMiddleware(newUserSchema),createUser);

export default userRouter