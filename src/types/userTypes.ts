import { Users } from "@prisma/client";

export type CreateUserData=Omit<Users,"id">;
export type UserData=Users;