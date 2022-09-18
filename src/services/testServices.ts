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
export async function getAllByDiscipline() {
    const tests=await testRepository.getAllByDiscipline();
   
    const responseObject:any={
        terms:tests
    }

    for(const term of responseObject.terms){
        for(const discipline of term.disciplines){
            const hash:any={};
            for(const teacherDiscipline of discipline.teachersDisciplines){
                for(const test of teacherDiscipline.tests){
                    test.teacher=test.teacherDiscipline.teacher;
                    delete test.teacherDiscipline
                    const newTest:any={...test};
                   
                    if(!hash[test.category.name]){
                        hash[test.category.name]=[];
                    }
                    delete newTest.category;
                    hash[test.category.name].push(newTest);
                }
                delete teacherDiscipline.tests;
            }
            if(!discipline.category){
                discipline.category=[];
            }
            for (const [key, value] of Object.entries(hash)) {
                const category={
                    name:key,
                    tests:value,
                }
                discipline.category.push(category)
            }
            delete discipline.teachersDisciplines;
        }
    }
    return responseObject;
}
export async function getAllByTeacher() {
    const tests=await testRepository.getAllByTeacher();
   
    const responseObject:any={
        teachers:tests
    }

    
    for(const teacher of responseObject.teachers){
        const hash:any={};
        for(const teacherDiscipline of teacher.teachersDisciplines){
            for(const test of teacherDiscipline.tests){
                test.discipline=test.teacherDiscipline.discipline;
                delete test.teacherDiscipline
                const newTest:any={...test};
               
                if(!hash[test.category.name]){
                    hash[test.category.name]=[];
                }
                delete newTest.category;
                hash[test.category.name].push(newTest);
            }
            delete teacherDiscipline.tests;
        }
        if(!teacher.category){
            teacher.category=[];
        }
        for (const [key, value] of Object.entries(hash)) {
            const category={
                name:key,
                tests:value,
            }
            teacher.category.push(category)
        }
        delete teacher.teachersDisciplines;
    }
    
    return responseObject;
}