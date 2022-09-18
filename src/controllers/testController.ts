import { Request, Response } from "express";
import * as testServices from '../services/testServices'

export async function createTest(req:Request,res:Response){
    const createdTest=await testServices.insertTest(req.body);
    return res.sendStatus(201);
}
export async function getAllByDiscipline(req:Request,res:Response){

    const tests=await testServices.getAllByDiscipline();

    return res.status(200).send(tests);
}
export async function getAllByTeacher(req:Request,res:Response){

    const tests=await testServices.getAllByTeacher();

    return res.status(200).send(tests);
}