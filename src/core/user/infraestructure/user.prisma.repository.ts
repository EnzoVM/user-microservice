import prisma from "../../../connections/prisma.connection";
import UserRepository from "../domain/user.repository";
import User from "../domain/user.model";


export default class UserPrismaRepository implements UserRepository{
    
    async addOwnerRestaurant (user: User) {
        const ownerResturantAdded = await prisma.user.create({
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
        
        return ownerResturantAdded
    }
}