import supertest from 'supertest';
import app from '../src/index';
import { prisma } from '../src/database';
import testFactory from './factories/testFactory';
import userFactory from './factories/userFactory';

beforeEach(async()=>{
    await prisma.$executeRaw`TRUNCATE TABLE tests`;
});
afterAll(async()=>{
    await prisma.$disconnect();
});
describe('Testing POST /tests/new',()=>{
    it('Should return 201 if a new test is correctly registered',async()=>{
        const user=await userFactory();
        await supertest(app).post('/users/new').send(user);
        const {text:token} = await supertest(app).post('/users/login').send(user);
        const test=await testFactory();
        const result=await supertest(app).
        post('/tests/new').
        set({Authorization:`Bearer ${token}`}).
        send(test);
        expect(result.status).toBe(201);
    });
    it('Should return 401 if registering a new test is attempted without proper authorization', async ()=>{
        const test=await testFactory();
        const result=await supertest(app).
        post('/tests/new').
        set({Authorization:`Bearer garbage`}).
        send(test);
        const result2=await supertest(app).post('/tests/new').send(test);
        expect(result.status).toBe(401);
        expect(result2.status).toBe(401);
    });
    it('Should return 404 if registering with a category that does not exist',async()=>{
        const test=await testFactory();
        test.categoryId=999;
        const user=await userFactory();
        await supertest(app).post('/users/new').send(user);
        const {text:token} = await supertest(app).post('/users/login').send(user);
        const result = await supertest(app).
        post('/tests/new').
        set({Authorization:`Bearer ${token}`}).
        send(test);
        expect(result.status).toBe(404);
    })
    it('Should return 404 if registering with invalid teacher Id and discipline Id combination',async()=>{
        const test=await testFactory();
        test.teacherId=9999;
        test.categoryId=9999;
        const user=await userFactory();
        await supertest(app).post('/users/new').send(user);
        const {text:token} = await supertest(app).post('/users/login').send(user);
        const result = await supertest(app).
        post('/tests/new').
        set({Authorization:`Bearer ${token}`}).
        send(test);
        expect(result.status).toBe(404);
    })
});