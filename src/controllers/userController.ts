import { Request, Response } from "express";
import * as userServices from '../services/userServices'

export async function createUser(req:Request,res:Response){
    await userServices.insertUser(req.body);
    return res.sendStatus(201);
}
export async function logIn(req:Request,res:Response) {
    const token=await userServices.signIn(req.body)
    return res.status(200).send(token)    
}