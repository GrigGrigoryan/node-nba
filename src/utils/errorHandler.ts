import { Response } from 'express';
import { StatusCode, Status } from '../common/enums';

export const sendErrorLocal = (err: any, res: Response) => {
  res.status(err.statusCode).send({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

export const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).send({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

export const sendErrorStage = (err: any, res: Response) => {
  if (err.isOperational) {
    // Operational, trusted error: send message to client
    res.status(err.statusCode).send({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other unknown error
    console.error(`ERROR 💥: ${err}`);

    res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
      status: Status.ERROR,
      message: 'Something went very wrong!',
    });
  }
};

export const sendErrorProd = (err: any, res: Response) => {
  if (err.isOperational) {
    // Operational, trusted error: send message to client
    res.status(err.statusCode).send({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other unknown error
    console.error(`ERROR 💥: ${err}`);

    res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
      status: Status.ERROR,
      message: 'Something went very wrong!',
    });
  }
};
