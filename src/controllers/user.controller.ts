import { Request, Response } from "express"
import CreateUser from "../core/user/application/create.user"
import UserPrismaRepository from "../core/user/infraestructure/prisma/user.prisma.repository"
import GetRoleIdUserByIdentification from "../core/user/application/get.role.user.by.id"
import LoginUser from "../core/user/application/login.user"

const createUser = new CreateUser(new UserPrismaRepository)
const getRoleIdUserByIdentification = new GetRoleIdUserByIdentification(new UserPrismaRepository)
const loginUser = new LoginUser(new UserPrismaRepository)

export const createNewRestaurantOwner = async (req: Request, res: Response) => {
    const {userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword} = req.body

    try {
        const newOwnerRestaurantAdded = await createUser.createRestaurantOwner(userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword)
        
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


export const createNewRestaurantEmployee = async (req: Request, res: Response) => {
    const {userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword, restaurantId} = req.body

    try {
        const newRestaurantEmployeeAdded = await createUser.createRestaurantEmployee(userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword, restaurantId)
        
        res.status(201).json({
            status: "OK",
            message: "The new restaurant employee has been inserted successfully",
            data: {
                userId: newRestaurantEmployeeAdded?.userId.toString(),
                userName: newRestaurantEmployeeAdded?.userName,
                userLastname: newRestaurantEmployeeAdded?.userLastname,
                userDNI: newRestaurantEmployeeAdded?.userDNI,
                userPhoneNumber: newRestaurantEmployeeAdded?.userPhoneNumber,
                userEmail: newRestaurantEmployeeAdded?.userEmail,
                userPassword: newRestaurantEmployeeAdded?.userPassword,
                roleId: newRestaurantEmployeeAdded?.roleId
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

export const login = async (req: Request, res: Response) => {
    const {userEmail, userPassword} = req.body

    try {
        const userToken: {userId: bigint, userRole: string} = await loginUser.login(userEmail, userPassword)

        res.status(200).json({
            status: 'OK',
            message: 'The user has successfully logged in',
            data: userToken
        })

    } catch (error: any) {
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}