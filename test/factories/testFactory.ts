import {faker}from '@faker-js/faker';

export default async function testFactory(){
    const teacherId=faker.mersenne.rand(1,2);
    const disciplineId=(teacherId===1 ? faker.mersenne.rand(1,3):faker.mersenne.rand(4,6));
    const newTest={
        name:faker.lorem.words(3),
        pdfUrl:faker.internet.url(),
        categoryId:faker.mersenne.rand(1,3),
        teacherId:teacherId,
        disciplineId:disciplineId
    }
    return newTest;
}