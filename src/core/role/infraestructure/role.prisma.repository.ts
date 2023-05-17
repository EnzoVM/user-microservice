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
        const roleFound = await prisma.role.findFirst({
            where:{
                roleName
            },
            select: {
                roleId: true
            }
        })

        if(!roleFound){return null}
        return roleFound.roleId
    }
}