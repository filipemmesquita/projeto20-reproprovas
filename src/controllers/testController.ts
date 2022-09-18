import { Request, Response } from "express";
import * as testServices from '../services/testServices'

export async function createTest(req:Request,res:Response){
    const createdTest=await testServices.insertTest(req.body);
    return res.sendStatus(201);
}