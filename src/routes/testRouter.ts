import { Router } from "express";
import { createTest, getAllByDiscipline } from "../controllers/testController";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import { newTestSchema } from "../schemas/testSchemas";

const testRouter=Router();

testRouter.post('/tests/new',
    validateToken,
    validateSchemaMiddleware(newTestSchema),
    createTest)
testRouter.get('/tests/bydiscipline/',validateToken,getAllByDiscipline);

export default testRouter;