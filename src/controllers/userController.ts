import { Request, Response } from "express";
import * as userServices from '../services/userServices'

export async function createUser(req:Request,res:Response){
    await userServices.insertUser(req.body);
    return res.sendStatus(201);
}