import { CreateUserData } from "../types/userTypes";
import * as userRepository from '../repositories/userRepository';
import jwt from 'jsonwebtoken';
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
    return await userRepository.insert(userData)
}

export async function signIn(body:CreateUserData) {
    const user=await userRepository.getByEmail(body.email);
    if(!user)
        throw{code:401};
    
    const comparePassword = bcrypt.compareSync(body.password,user.password)
    if(!comparePassword)
        throw{code:401};
    const payload = {userId:user.id,email:user.email}
    const SECRET=process.env.JWT_SECRET??"";
    const token=jwt.sign(payload,SECRET)
    return token    
}