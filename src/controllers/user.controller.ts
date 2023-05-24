import { Request, Response } from "express"
import InsertUser from "../core/user/application/insert.user"
import GetUserRoleById from "../core/user/application/get.user.role.by.id"
import LoginUser from "../core/user/application/login.user"
import UserPrismaRepository from "../core/user/infraestructure/prisma/user.prisma.repository"
import RestaurantServiceRepository from "../core/user/infraestructure/services/restaurant.service.repository"

const insertUser = new InsertUser(new UserPrismaRepository, new RestaurantServiceRepository)
const getUserRoleById = new GetUserRoleById(new UserPrismaRepository)
const loginUser = new LoginUser(new UserPrismaRepository)

export const createNewOwner = async (req: Request, res: Response) => {
    const {userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword} = req.body

    try {
        const newOwnerRestaurantAdded = await insertUser.createOwner(userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword)
        
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


export const createNewEmployee = async (req: Request, res: Response) => {
    const {userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword, restaurantId} = req.body

    try {
        const newRestaurantEmployeeAdded = await insertUser.createEmployee(userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword, restaurantId)
        
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

export const getRoleById = async (req: Request, res: Response) => {
    const {userId} = req.params

    try {
        const roleIdUserFound = await getUserRoleById.getUserRoleById(BigInt(userId))

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