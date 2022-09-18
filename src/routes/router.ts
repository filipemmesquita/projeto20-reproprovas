import { Router } from 'express';
import testRouter from './testRouter';
import userRouter from './userRouter';

const router = Router();
router.use(userRouter);
router.use(testRouter);

export default router;