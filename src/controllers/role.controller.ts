import { Request, Response } from "express"
import InsertRole from "../core/role/application/insert.role"
import GetIdByRoleName from "../core/role/application/get.id.by.role.name"
import GetRoleNameById from "../core/role/application/get.role.by.id"
import RolePrismaRepository from "../core/role/infraestructure/role.prisma.repository"

const insertRole = new InsertRole(new RolePrismaRepository)
const getIdByRoleName = new GetIdByRoleName(new RolePrismaRepository)
const getRoleNameById = new GetRoleNameById(new RolePrismaRepository)

export const createNewRole = async (req: Request, res: Response) => {
    const {roleName, roleDescription} = req.body

    try {
        const newRoleAdded = await insertRole.createRole(roleName, roleDescription)        
        res.status(201).json({
            status: "OK",
            message: "The new role has been inserted successfully",
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
        const roleIdFound = await getIdByRoleName.getIdByRoleName(roleName)
        res.status(201).json({
            status: "OK",
            message: "The role id has been found ",
            data: roleIdFound
        })
    } catch (error: any) {
        res.status(400).json({
            status: "Fail",
            message: error.message,
        })
    }
}

export const getRoleById = async (req: Request, res: Response) => {
    const { roleId } = req.params

    try {
        const roleNameFound = await getRoleNameById.getRoleNameById(roleId)
        res.status(201).json({
            status: "OK",
            message: "The role name has been found ",
            data: roleNameFound
        })
    } catch (error: any) {
        res.status(400).json({
            status: "Fail",
            message: error.message,
        })
    }
}