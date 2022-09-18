import { prisma } from "../database";
import { DisciplineData } from "../types/disciplineTypes";


export async function getById(id:any):Promise<DisciplineData|null>{
    const discipline:DisciplineData|null=await prisma.disciplines.findFirst({
        where:{
            id,
        },
        select:{
            id:true,
            name:true,
            termId:true
        }
    })
    return discipline;
}
export async function getByName(name:any):Promise<DisciplineData|null>{
    const discipline:DisciplineData|null=await prisma.disciplines.findFirst({
        where:{
            name,
        },
        select:{
            id:true,
            name:true,
            termId:true
        }
    })
    return discipline;
}
