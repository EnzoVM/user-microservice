import prisma from "../../../../connections/prisma.connection"
import Role from "../../domain/role.model"
import RolePersistanceRepository from "../../domain/role.persistance.repository"

export default class RolePrismaRepository implements RolePersistanceRepository{
   
    async insertRole (role: Role): Promise<Role>{
        try {
            const roleSaved = await prisma.role.create({
                data: {
                    roleId: role.roleId,
                    roleName: role.roleName,
                    roleDescription: role.roleDescription
                }
            })

            return roleSaved

        } catch (error:any) {
            throw new Error('ERROR IN INSERT ROLE')
        }
    }
    
    async getRoleIdByRoleName (roleName: string): Promise<string | null> {
        try {
            const roleIdFound = await prisma.role.findFirst({
                where:{
                    roleName
                },
                select: {
                    roleId: true
                }
            })
            
            if(!roleIdFound) {return null}

            return roleIdFound.roleId
            
        } catch (error:any) {
            throw new Error('ERROR IN GET ID BY ROLE NAME')
        }
    }

    async getRoleNameByRoleId (roleId: string): Promise<string | null> {
        try {
            const roleNameFound = await prisma.role.findUnique({
                where: {
                    roleId
                },
                select: {
                    roleName: true
                }
            })
            
            if(!roleNameFound) {return null}

            return roleNameFound.roleName

        } catch (error:any) {
            throw new Error('ERROR IN GET ROLE NAME BY ID')
        }
    }

    async getRoleNameByUserId (userId: bigint): Promise<Role | null> {
        try {
            const roleNameFound = await prisma.role.findFirst({
                where:{
                    users:{
                        some:{
                            userId
                        }
                    }
                }
            })

            return roleNameFound

        } catch (error:any) {
            throw new Error('ERROR IN GET ROLE NAME BY ID')
        }
    }
}