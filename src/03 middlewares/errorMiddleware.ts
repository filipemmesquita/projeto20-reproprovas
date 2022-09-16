import { NextFunction, Request, Response } from 'express';

export function errorHandlerMiddleware(
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  if (err.code) {
    if(err.messsage){
      console.log("aquió")
      return res.status(err.code).send(err.messsage);
    }
    return res.sendStatus(err.code);
  }

  return res.sendStatus(500);
}
