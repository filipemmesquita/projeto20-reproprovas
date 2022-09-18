import { prisma } from "../database";
import { CategoryData } from "../types/categoryTypes";


export async function getById(id:any):Promise<CategoryData|null>{
    const category:CategoryData|null=await prisma.categories.findFirst({
        where:{
            id,
        },
        select:{
            id:true,
            name:true
        }
    })
    return category;
}
export async function getByName(name:any):Promise<CategoryData|null>{
    const category:CategoryData|null=await prisma.categories.findFirst({
        where:{
            name,
        },
        select:{
            id:true,
            name:true
        }
    })
    return category;
}