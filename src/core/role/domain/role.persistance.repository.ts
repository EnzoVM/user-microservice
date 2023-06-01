import Role from "./role.model";

export default interface RolePersistanceRepository {
    insertRole: (role: Role) => Promise<Role>
    getRoleIdByRoleName: (roleName: string) => Promise<string | null>
    getRoleNameByRoleId: (roleId: string) => Promise<string | null>
    getRoleNameByUserId: (userId: bigint) => Promise<Role | null>
}