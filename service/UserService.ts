import { PrismaClient } from "@prisma/client";
import UserDAO from "../dao/UserDAO";
import UserDTO from "../dto/UserDTO";
import UserRepository from "../repository/UserRepository";
import bcrypt from 'bcrypt';

export default class UserService {
    userRepository = new UserRepository();
    prisma = new PrismaClient();

    async generateUserId(): Promise<string> {
        try {
            const lastUser = await this.prisma.user.findFirst({
                orderBy: { id: 'desc' }, // Get the last user by ID in descending order
                select: { id: true } // Select only the ID field
            });

            if (lastUser?.id) {
                const lastIdNumber = parseInt(lastUser.id.replace("USER-", ""), 10);
                return `USER-${(lastIdNumber + 1).toString().padStart(3, "0")}`;
            }

            return "USER-001"; // Default ID if no users exist
        } catch (error) {
            console.error("Error generating user ID:", error);
            throw new Error("Failed to generate user ID.");
        }
    }

    async addUser(user: UserDTO) {
        try {
            const userId = await this.generateUserId(); // Await the ID generation
            const newUser = new UserDAO(userId, user.username, user.password);
            return await this.userRepository.createUser(newUser);
        } catch (error) {
            console.error("Error adding user:", error);
            throw new Error("Failed to add user.");
        }
    }

    async verifyUserCredentials(verifyUser: UserDTO) {
        const user : UserDAO | null = await this.prisma.user.findUnique({
            where: { username: verifyUser.username },
        });
        if (!user) {
            return false;
        }
    
        return await bcrypt.compare(verifyUser.password, user.password);
    }
}
