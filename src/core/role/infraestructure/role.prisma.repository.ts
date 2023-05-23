import prisma from "../../../connections/prisma.connection";
import Role from "../domain/role.model";
import RoleRepository from "../domain/role.repository";

export default class RolePrismaRepository implements RoleRepository{
   
    async insertRole (role: Role) {
        const roleSaved = await prisma.role.create({
            data: {
                roleId: role.roleId,
                roleName: role.roleName,
                roleDescription: role.roleDescription
            }
        })
        return roleSaved
    }

    async getIdByRoleName (roleName: string) {
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
    }

    async getRoleNameById (roleId: string) {
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
    }
}