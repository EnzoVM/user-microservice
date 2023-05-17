import RoleRepositury from "../domain/role.repository";

export default class GetIdByRoleName {
    private readonly roleRepository: RoleRepositury

    constructor(roleRepository: RoleRepositury){
        this.roleRepository = roleRepository
    }

    async getIdByRoleName (roleName: string){
        const roleFound = await this.roleRepository.getIdByRoleName(roleName)
        return roleFound
    }
}