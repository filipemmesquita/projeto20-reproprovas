import supertest from 'supertest';
import app from '../src/index';
import { prisma } from '../src/database';
import userFactory from './factories/userFactory';
import jwt from 'jsonwebtoken';

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
describe('Testing POST /users/login',()=>{
  it('Should return 200 if a user logs in correctly',async()=>{
    const user=await userFactory();
    await supertest(app).post('/users/new').send(user);

    const result = await supertest(app).post('/users/login').send(user);

    expect(result.status).toBe(200);
  })
  it('Token should contain id and email',async()=>{
    const user=await userFactory();
    const {body:createdUser} = await supertest(app).post('/users/new').send(user);
    const result =await supertest(app).post('/users/login').send(user);
    const token = result.text
    const secretKey=process.env.JWT_SECRET??"";

    const userData=jwt.verify(token,secretKey)
    expect(userData).toMatchObject(createdUser);
  });
})
  