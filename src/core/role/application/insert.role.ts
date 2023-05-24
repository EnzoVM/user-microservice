import RoleRepositury from "../domain/role.repository";
import Role from "../domain/role.model";

export default class InsertRole {
    private readonly roleRepository: RoleRepositury

    constructor(roleRepository: RoleRepositury){
        this.roleRepository = roleRepository
    }
    
    async createRole (roleName: string, roleDescription: string) {
        const roleCreated = new Role(roleName, roleDescription)
        const newRoleCreated = await this.roleRepository.insertRole(roleCreated)
        return newRoleCreated
    }
}