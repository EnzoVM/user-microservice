import prisma from "../../../../connections/prisma.connection";
import UserRepository from "../../domain/user.repository";
import User from "../../domain/user.model";


export default class UserPrismaRepository implements UserRepository{
    
    async insertUser (user: User) {
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
    }

    async getRoleIdUserByIdentification (userId: bigint) {
        const userFound = await prisma.user.findUnique({
            where: {
                userId
            },
            select: {
                roleId: true
            }
        })

        if(!userFound) {return null}

        return userFound.roleId
    }

    async loginUser (userEmail: string) {
        const userFound = await prisma.user.findFirst({
            where: {
                userEmail
            }
        })

        return userFound
    }
}