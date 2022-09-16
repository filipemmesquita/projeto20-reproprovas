import { NextFunction, Request, Response } from 'express';

export function errorHandlerMiddleware(
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  if (err.type) {
    if(err.messsage){
      return res.status(err.type).send(err.messsage);
    }
    return res.sendStatus(err.type);
  }

  return res.sendStatus(500);
}
