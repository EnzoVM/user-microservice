import prisma from "../../../connections/prisma.connection";
import UserRepository from "../domain/user.repository";
import User from "../domain/user.model";


export default class UserPrismaRepository implements UserRepository{
    
    async insertRestaurantOwner (user: User) {
        const restaurantOwnerSaved = await prisma.user.create({
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
        
        return restaurantOwnerSaved
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
}