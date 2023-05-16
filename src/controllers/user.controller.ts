import { Request, Response } from "express"
import UserUseCase from "../core/user/application/user.usecase"
import UserPrismaRepository from "../core/user/infraestructure/user.prisma.repository"

const userUserCase = new UserUseCase(new UserPrismaRepository)

export const addNewOwnerRestaurant = async (req: Request, res: Response) => {
    const {userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword, roleId} = req.body

    try {
        const newOwnerRestaurantAdded = await userUserCase.addNewOwnerRestaurant(userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword, roleId)
        
        res.status(201).json({
            status: "OK",
            message: "El nuevo propietario se ha añadido con exito",
            data: newOwnerRestaurantAdded.userId.toString()
        })
    } catch (error) {
        console.log(error)
        
        res.status(404).json({
            status: "Fail",
            message: "El nuevo propietario no se ha añadido con exito",
            data: ""
        })
    }
}