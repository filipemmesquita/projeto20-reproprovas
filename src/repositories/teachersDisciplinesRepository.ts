import { prisma } from "../database";
import { TeachersDisciplinesData } from "../types/teachersDisciplinesTypes";

export async function getById(id:any):Promise<TeachersDisciplinesData|null>{
    const teachersDisciplines:TeachersDisciplinesData|null=await prisma.teachersDisciplines.findFirst({
        where:{
            id,
        },
    })
    return teachersDisciplines;
}
export async function getByTeacherIdandDisciplineId(teacherId:number,disciplineId:number){
    const teachersDisciplines:TeachersDisciplinesData|null=await prisma.teachersDisciplines.findFirst({
        where:{
            teacherId,
            disciplineId
        },
    })
    return teachersDisciplines
}