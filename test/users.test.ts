import supertest from 'supertest';
import app from '../src/index';
import { prisma } from '../src/database';
import userFactory from './factories/userFactory';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users`;
  });
  
  afterAll(async () => {
    await prisma.$disconnect();
  });
describe('Testing POST /users/new ',()=>{
    it('Should return 201 if a new user is correctly registered', async () => {
        const user = await userFactory();
        const result = await supertest(app).post('/users/new').send(user);
        expect(result.status).toBe(201);
    });

    it('Should return 409 when trying to register a user that already exists', async ()=>{
        const user=await userFactory();
        await supertest(app).post('/users/new').send(user);
        const result = await supertest(app).post('/users/new').send(user);
        expect(result.status).toBe(409);
    });
})
  