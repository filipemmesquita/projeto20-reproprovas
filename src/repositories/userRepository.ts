import { prisma } from "../database";
import { CreateUserData, UserData } from "../types/userTypes";

export async function insert(userData:CreateUserData){
    return await prisma.users.create({
        data:userData
    });
}
export async function getByEmail(email:any):Promise<UserData|null>{
    const user:UserData|null=await prisma.users.findFirst({
        where:{
            email:email,
        },
        select:{
            id:true,
            email:true,
            password:true
        }
    })
    return user;
}