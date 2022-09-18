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
export async function getByDiscipline() {
    const tests1=await testRepository.getAllByDisciplineId();
   
    const responseObject:any={
        terms:tests1
    }

    for(const term of responseObject.terms){
        for(const discipline of term.disciplines){
            for(const teacherDiscipline of discipline.teachers){
                const hash:any={};
                for(const test of teacherDiscipline.tests){
                    const newTest:any={...test};
                   
                    if(!hash[test.category.name]){
                        hash[test.category.name]=[];
                    }
                    delete newTest.category;
                    hash[test.category.name].push(newTest);
                }
                delete teacherDiscipline.tests;
                teacherDiscipline.category=[];
                for (const [key, value] of Object.entries(hash)) {
                    const category={
                        name:key,
                        tests:value,
                    }
                    teacherDiscipline.category.push(category)
                }
            }
        }
    }
    return tests1
}
export async function getByDiscipline2(disciplineId:number) {
    const tests1=await testRepository.figuringThisOut();


    return tests1
}