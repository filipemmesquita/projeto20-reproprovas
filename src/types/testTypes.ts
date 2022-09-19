import { Tests } from "@prisma/client";

export type CreateTestData=Omit<Tests,"id">;

export type TestData=Tests;
export type UnprocessedTestData={
    name:string,
    pdfUrl:string,
    categoryId:string,
    teacherId:string,
    disciplineId:string,
}
export type Test=Omit<Tests,"categoryId"|"teacherDisciplineId">

export interface AllTestsByDiscipline{
    terms:[{
        id:number,
        number:number,
        disciplines:[{
            id:number,
            name:string,
            category:[{
                name:string,
                tests:[{
                    id:number,
                    name:string,
                    pdfUrl:string,
                    teacher:{
                        id:number,
                        name:string,
                    }
                }]
            }]
        }]
    }]
}
export interface AllTestsByTeacher{
    teachers:[{
        id:number,
        name:string,
        category:[{
            name:string,
            tests:[{
                id:number,
                name:string,
                pdfUrl:string,
                discipline:{
                    id:number,
                    name:string
                }
            }]
        }]
    }]

}