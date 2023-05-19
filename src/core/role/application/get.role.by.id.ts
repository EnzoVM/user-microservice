import RoleRepositury from "../domain/role.repository";

export default class GetRoleNameById {
    private readonly roleRepository: RoleRepositury

    constructor(roleRepository: RoleRepositury){
        this.roleRepository = roleRepository
    }

    async getRoleNameById (roleId: string){
        const roleIdFound = await this.roleRepository.getRoleNameById(roleId)
        return roleIdFound
    }
}