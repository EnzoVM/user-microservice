import { Request, Response } from "express"

import InsertRole from "../core/role/application/insert.role"
import GetRoleIdByRoleName from "../core/role/application/get.role.id.by.role.name"
import GetRoleNameByRoleId from "../core/role/application/get.role.name.by.role.id"
import GetRoleNameByUserId from "../core/role/application/get.role.name.by.user.id"

import RolePrismaRepository from "../core/role/infraestructure/prisma/role.prisma.repository"
import RoleUuidRepository from "../core/role/infraestructure/uuid/role.uuid.repository"

const insertRole = new InsertRole(new RolePrismaRepository, new RoleUuidRepository)
const getRoleIdByRoleName = new GetRoleIdByRoleName(new RolePrismaRepository)
const getRoleNameByRoleId = new GetRoleNameByRoleId(new RolePrismaRepository)
const getRoleNameByUserId = new GetRoleNameByUserId(new RolePrismaRepository)

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

export const getRoleIdByName = async (req: Request, res: Response) => {
    const { roleName } = req.params

    try {
        const roleIdFound = await getRoleIdByRoleName.getRolId(roleName)
        
        res.status(201).json({
            status: "OK",
            message: "The role id has been found",
            data: roleIdFound
        })

    } catch (error: any) {
        res.status(400).json({
            status: "Fail",
            message: error.message,
        })
    }
}

export const getRoleNameById = async (req: Request, res: Response) => {
    const { roleId } = req.params

    try {
        const roleNameFound = await getRoleNameByRoleId.getRoleName(roleId)
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

export const getRoleByUserId = async (req: Request, res: Response) => { 
    const { userId } = req.params

    try {
        const roleNameFound = await getRoleNameByUserId.getRoleName(BigInt(userId))

        res.status(200).json({
            status: 'OK',
            message: 'The role name has been found',
            data: roleNameFound
        })
    } catch (error:any) {
        
        res.status(400).json({
            status: "Fail",
            message: error.message,
        })
    }

}