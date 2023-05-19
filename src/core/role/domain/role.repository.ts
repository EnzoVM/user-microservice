import Role from "./role.model";

export default interface RoleRepository {

    insertRole: (role: Role) => Promise<Role>
    getIdByRoleName: (roleName: string) => Promise<string | null>
    getRoleNameById: (roleId: string) => Promise<string | null>

}