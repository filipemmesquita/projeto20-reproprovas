import { prisma } from "../database";
import { CreateTestData,TestData } from "../types/testTypes";

export async function insert(testData:CreateTestData){
    return await prisma.tests.create({
        data:testData
    });
}