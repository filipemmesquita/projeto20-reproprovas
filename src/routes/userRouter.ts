import { Router } from "express";
import { createUser, logIn }from '../controllers/userController';
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { newUserSchema,logInSchema } from '../schemas/userSchemas';

const userRouter=Router();

userRouter.post('/users/new',validateSchemaMiddleware(newUserSchema),createUser);
userRouter.post('/users/login',validateSchemaMiddleware(logInSchema),logIn);

export default userRouter