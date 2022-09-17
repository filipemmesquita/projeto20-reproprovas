import cors from 'cors';
import express, { json } from 'express';
import 'express-async-errors';
import { errorHandlerMiddleware } from './middlewares/errorMiddleware';
import router from './routes/router';

const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandlerMiddleware);

export default app;
