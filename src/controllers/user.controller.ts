import { Request, Response } from "express"
import CreateRestaurantOwner from "../core/user/application/create.restaurant.owner"
import UserPrismaRepository from "../core/user/infraestructure/user.prisma.repository"
import GetRoleIdUserByIdentification from "../core/user/application/get.role.user.by.id"

const createRestaurantOwner = new CreateRestaurantOwner(new UserPrismaRepository)
const getRoleIdUserByIdentification = new GetRoleIdUserByIdentification(new UserPrismaRepository)

export const createNewRestaurantOwner = async (req: Request, res: Response) => {
    const {userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword} = req.body

    try {
        const newOwnerRestaurantAdded = await createRestaurantOwner.createRestaurantOwner(userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword)
        
        res.status(201).json({
            status: "OK",
            message: "The new restaurant owner has been inserted successfully",
            data: {
                userId: newOwnerRestaurantAdded?.userId.toString(),
                userName: newOwnerRestaurantAdded?.userName,
                userLastname: newOwnerRestaurantAdded?.userLastname,
                userDNI: newOwnerRestaurantAdded?.userDNI,
                userPhoneNumber: newOwnerRestaurantAdded?.userPhoneNumber,
                userEmail: newOwnerRestaurantAdded?.userEmail,
                userPassword: newOwnerRestaurantAdded?.userPassword,
                roleId: newOwnerRestaurantAdded?.roleId
            }
        })
    } catch (error: any) {
        
        res.status(400).json({
            status: "Fail",
            message: error.message,
        })
    }
}

export const getRoleUserById = async (req: Request, res: Response) => {
    const {userId} = req.params

    try {
        const roleIdUserFound = await getRoleIdUserByIdentification.getRoleUserById(BigInt(userId))

        res.status(200).json({
            status: 'OK',
            message: "The user's role name has been found",
            data: roleIdUserFound
        })
    } catch (error: any) {
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }

}