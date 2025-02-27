import { PrismaClient } from "@prisma/client";
import UserDAO from "../dao/UserDAO";
import bcrypt from 'bcrypt';

export default class UserRepository {

    prisma = new PrismaClient();

   async createUser(user : UserDAO) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
    
        const addedUser = await this.prisma.user.create({
            data: {
                id: user.id,
                username : user.username,
                password : hashedPassword,
            },
        });
        console.log("User created:", addedUser);
    }

    async  getAllUsers(){
        try{
            return await this.prisma.user.findMany();
        }catch(err){
            console.log("error getting user from prisma data",err);
        }
    }
}