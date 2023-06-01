import prisma from "../../../../connections/prisma.connection";
import UserPersistanceRepository from "../../domain/user.persistance.repository";
import User from "../../domain/user.model";

export default class UserPrismaRepository implements UserPersistanceRepository{
    
    async insertUser (user: User): Promise<User> {
        try {
            const userSaved = await prisma.user.create({
                data: {
                    userId: user.userId,
                    userName: user.userName,
                    userLastname: user.userLastname,
                    userDNI: user.userDNI,
                    userPhoneNumber: user.userPhoneNumber,
                    userEmail: user.userEmail,
                    userPassword: user.userPassword,
                    roleId: user.roleId
                }
            })
            
            return userSaved

        } catch (error:any) {
            throw new Error('ERROR IN INSERT USER')
        }
    }
    
    async getUserByEmail (userEmail: string): Promise<User | null> {
        try {
            const userFound = await prisma.user.findFirst({
                where: {
                    userEmail
                }
            })
    
            return userFound

        } catch (error:any) {
            throw new Error('ERROR IN LOGIN USER')
        }     
    }
}