import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import expressAsyncHandler from 'express-async-handler';

export const asyncHandler = (fn: any) => {
  return expressAsyncHandler(async (req: Req, res: Res, next: Next) => {
    return fn(req, res, next);
  });
};
