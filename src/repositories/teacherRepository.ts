import { prisma } from "../database";
import { TeacherData } from "../types/teacherTypes";

export async function getById(id:any):Promise<TeacherData|null>{
    const teacher:TeacherData|null=await prisma.teachers.findFirst({
        where:{
            id,
        },
        select:{
            id:true,
            name:true
        }
    })
    return teacher;
}
export async function getByName(name:any):Promise<TeacherData|null>{
    const teacher:TeacherData|null=await prisma.teachers.findFirst({
        where:{
            name,
        },
        select:{
            id:true,
            name:true
        }
    })
    return teacher;
}