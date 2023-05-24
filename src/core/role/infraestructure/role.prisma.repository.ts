import prisma from "../../../connections/prisma.connection";
import Role from "../domain/role.model";
import RoleRepository from "../domain/role.repository";

export default class RolePrismaRepository implements RoleRepository{
   
    async insertRole (role: Role) {
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

    async getIdByRoleName (roleName: string) {
        try {
            const roleIdFound = await prisma.role.findFirst({
                where:{
                    roleName
                },
                select: {
                    roleId: true
                }
            })
    
            if(!roleIdFound){return null}
            return roleIdFound.roleId
        } catch (error:any) {
            throw new Error('ERROR IN GET ID BY ROLE NAME')
        }
    }

    async getRoleNameById (roleId: string) {
        try {
            const roleNameFound = await prisma.role.findFirst({
                where: {
                    roleId
                },
                select: {
                    roleName: true
                }
            })
    
            if(!roleNameFound){return null}
            return roleNameFound.roleName
        } catch (error:any) {
            throw new Error('ERROR IN GET ROLE NAME BY ID')
        }
    }
}