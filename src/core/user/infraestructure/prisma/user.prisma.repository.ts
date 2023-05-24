import prisma from "../../../../connections/prisma.connection";
import UserRepository from "../../domain/user.repository";
import User from "../../domain/user.model";

export default class UserPrismaRepository implements UserRepository{
    
    async insertUser (user: User) {
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

    async getUserById (userId: bigint) {
        try {
            const userFound = await prisma.user.findUnique({
                where: {
                    userId
                }
            })
    
            if(!userFound) {return null}
    
            return userFound
        } catch (error:any) {
            throw new Error('ERROR IN GET USER BY ID')
        }
    }

    async loginUser (userEmail: string) {
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