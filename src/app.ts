import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api', router);

const test = (req: Request, res: Response) => {
  res.send('Server is running ....');
};

app.use('/', test);

// globalErrorHandlerMiddleware
app.use(globalErrorHandler);

// Not found middleware
app.use(notFound);

export default app;
