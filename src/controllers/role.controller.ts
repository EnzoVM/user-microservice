import { Request, Response } from "express"
import InsertRole from "../core/role/application/insert.role"
import GetIdByRoleName from "../core/role/application/get.id.by.role.name"
import RolePrismaRepository from "../core/role/infraestructure/role.prisma.repository"

const insertRole = new InsertRole(new RolePrismaRepository)
const getIdByRoleName = new GetIdByRoleName(new RolePrismaRepository)

export const createNewRole = async (req: Request, res: Response) => {
    const {roleName, roleDescription} = req.body

    try {
        const newRoleAdded = await insertRole.insertNewRole(roleName, roleDescription)        
        res.status(201).json({
            status: "OK",
            message: "El nuevo rol se ha añadido con exito",
            data: newRoleAdded
        })
    } catch (error: any) { 
        res.status(400).json({
            status: "Fail",
            message: error.message,
        })
    }
}

export const getIdByName = async (req: Request, res: Response) => {
    const { roleName } = req.params

    try {
        const roleFound = await getIdByRoleName.getIdByRoleName(roleName)
        res.status(201).json({
            status: "OK",
            message: "El nuevo rol se ha añadido con exito",
            data: roleFound
        })
    } catch (error: any) {
        res.status(400).json({
            status: "Fail",
            message: error.message,
        })
    }
}