import { NextFunction, Request, Response } from 'express';

export function errorHandlerMiddleware(
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.code) {
    if(err.message){
      return res.status(err.code).send(err.message);
    }
    return res.sendStatus(err.code);
  }
  console.log(err);
  return res.sendStatus(500);
}
