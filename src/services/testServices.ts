import { CreateTestData, UnprocessedTestData } from "../types/testTypes";
import * as testRepository from '../repositories/testRepository';
import * as categoryRepository from '../repositories/categoryRepository'
import * as disciplineRepository from '../repositories/disciplineRepository'
import * as teachersDisciplinesRepository from '../repositories/teachersDisciplinesRepository'
import { CategoryData } from "../types/categoryTypes";
import { DisciplineData } from "../types/disciplineTypes";
import { TeachersDisciplinesData } from "../types/teachersDisciplinesTypes";

export async function insertTest(test:UnprocessedTestData) {
    const category:CategoryData|null= await categoryRepository.getById(test.categoryId);
    if(!category)
        throw{code:404,message:"Category was not found"}

    const teachersDisciplines:TeachersDisciplinesData|null=await teachersDisciplinesRepository.getByTeacherIdandDisciplineId(Number(test.teacherId),Number(test.disciplineId))
    if(!teachersDisciplines)
        throw{code:404,message:"Combination of teacher and discipline was not found"};
    
    const processedTest:CreateTestData={
        name:test.name,
        pdfUrl:test.pdfUrl,
        categoryId:category.id,
        teacherDisciplineId:teachersDisciplines.id
    }
    return await testRepository.insert(processedTest)
}