import { CreateUserData } from "../types/userTypes";
import * as userRepository from '../repositories/userRepository';
//import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function insertUser(body:CreateUserData) {
    const userAlreadyExists=await userRepository.getByEmail(body.email);
    if(userAlreadyExists){
        throw {code:409 ,message:"Email is already in use."}
    }
    const hashedPassword=bcrypt.hashSync(body.password,10);
    const userData:CreateUserData={
        email:body.email,
        password:hashedPassword
    };
    await userRepository.insert(userData)
}
