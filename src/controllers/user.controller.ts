import { Request, Response } from "express"
import InsertUser from "../core/user/application/insert.user"
import LoginUser from "../core/user/application/login.user"

import UserPrismaRepository from "../core/user/infraestructure/prisma/user.prisma.repository"
import RestaurantServiceRepository from "../core/user/infraestructure/services/restaurant.service.repository"
import UserUuidRepository from "../core/user/infraestructure/uuid/user.uuid.repository"
import UserBcryptRepository from "../core/user/infraestructure/bcrypt/user.bcrypt.repository"
import RolePrismaRepository from "../core/role/infraestructure/prisma/role.prisma.repository"

const insertUser = new InsertUser(new UserPrismaRepository, new RestaurantServiceRepository, new UserUuidRepository, new UserBcryptRepository, new RolePrismaRepository)
const loginUser = new LoginUser(new UserPrismaRepository, new UserBcryptRepository, new RolePrismaRepository)

export const createNewOwner = async (req: Request, res: Response) => {
    const {userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword} = req.body

    try {
        const newOwnerRestaurantAdded = await insertUser.createOwner(userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword)
        
        res.status(201).json({
            status: "OK",
            message: "The new owner has been inserted successfully",
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
            message: "The new employee has been inserted successfully",
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


export const createNewClient = async (req: Request, res: Response) => {
    const {userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword} = req.body

    try {
        const newClientAdded = await insertUser.createClient(userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword)
        
        res.status(201).json({
            status: "OK",
            message: "The new client has been inserted successfully",
            data: {
                userId: newClientAdded?.userId.toString(),
                userName: newClientAdded?.userName,
                userLastname: newClientAdded?.userLastname,
                userDNI: newClientAdded?.userDNI,
                userPhoneNumber: newClientAdded?.userPhoneNumber,
                userEmail: newClientAdded?.userEmail,
                userPassword: newClientAdded?.userPassword,
                roleId: newClientAdded?.roleId
            }
        })
    } catch (error: any) {

        res.status(400).json({
            status: "Fail",
            message: error.message,
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