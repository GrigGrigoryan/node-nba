import express, {Request as Req, Response as Res, NextFunction as Next, Application, Router} from 'express';
import { NotFound } from "./core/errors";
import { sendErrorDev, sendErrorLocal, sendErrorProd, sendErrorStage } from "./utils";
import { NodeEnv, Status, StatusCode } from "./common/enums";
import apiRouter from "./routes";

const app: Application = express();
app.options('/*', (req: Req, res: Res, next: Next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).send('OK');
});

app.use('/', (req: Req, res: Res, next: Next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
});

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.static('static'));

// Add APIs
app.use('/api', apiRouter);

// Handle undefined endpoint
app.all('*', (req, res, next) => {
  next(new NotFound(`Can't find ${req.method} ${req.originalUrl} on this server!`));
});

// handle Errors
app.use('/', (err: { statusCode: number; status: string, isOperational: boolean }, req: Req, res: Res, next: Next) => {
  err.statusCode = err.statusCode || StatusCode.INTERNAL_SERVER_ERROR;
  err.status = err.status || Status.ERROR;

  switch (process.env.NODE_ENV) {
    case NodeEnv.LOCAL:
      sendErrorLocal(err, res);
      break;
    case NodeEnv.DEV:
      sendErrorDev(err, res);
      break;
    case NodeEnv.STAGE:
      sendErrorStage(err, res);
      break;
    case NodeEnv.PROD:
      sendErrorProd(err, res);
      break;
  }
});

export default app;
