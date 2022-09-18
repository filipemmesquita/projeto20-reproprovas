import { Router } from "express";
import { createTest } from "../controllers/testController";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import { newTestSchema } from "../schemas/testSchemas";

const testRouter=Router();

testRouter.post('/tests/new',
    validateToken,
    validateSchemaMiddleware(newTestSchema),
    createTest)

export default testRouter;