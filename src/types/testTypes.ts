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