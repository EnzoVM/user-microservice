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

export const createNewOwnerOrClient = (userRole: string) => {
    return async (req: Request, res: Response) => {
        const {userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword} = req.body

        try {
            const newUserAdded = await insertUser.createOwnerOrClient(userRole, userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword)
            
            res.status(201).json({
                status: "OK",
                message: `The new ${userRole} has been inserted successfully`,
                data: {
                    userId: newUserAdded?.userId.toString(),
                    userName: newUserAdded?.userName,
                    userLastname: newUserAdded?.userLastname,
                    userDNI: newUserAdded?.userDNI,
                    userPhoneNumber: newUserAdded?.userPhoneNumber,
                    userEmail: newUserAdded?.userEmail,
                    userPassword: newUserAdded?.userPassword,
                    roleId: newUserAdded?.roleId
                }
            })

        } catch (error: any) {
            res.status(400).json({
                status: "Fail",
                message: error.message,
            })
        }
    }
}

export const createNewEmployee = async (req: Request, res: Response) => {
    const {userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword, restaurantId} = req.body

    try {
        const newEmployeeAdded = await insertUser.createEmployee(userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword, restaurantId)
        
        res.status(201).json({
            status: "OK",
            message: "The new employee has been inserted successfully",
            data: {
                userId: newEmployeeAdded?.userId.toString(),
                userName: newEmployeeAdded?.userName,
                userLastname: newEmployeeAdded?.userLastname,
                userDNI: newEmployeeAdded?.userDNI,
                userPhoneNumber: newEmployeeAdded?.userPhoneNumber,
                userEmail: newEmployeeAdded?.userEmail,
                userPassword: newEmployeeAdded?.userPassword,
                roleId: newEmployeeAdded?.roleId
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