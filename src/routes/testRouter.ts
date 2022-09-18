import { Router } from "express";
import { createTest, getAllByDiscipline, getAllByTeacher } from "../controllers/testController";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import { newTestSchema } from "../schemas/testSchemas";

const testRouter=Router();

testRouter.post('/tests/new',
    validateToken,
    validateSchemaMiddleware(newTestSchema),
    createTest)
testRouter.get('/tests/bydiscipline/',validateToken,getAllByDiscipline);
testRouter.get('/tests/byteacher/',validateToken,getAllByTeacher);

export default testRouter;