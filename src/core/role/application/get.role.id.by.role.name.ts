import RolePersistanceRepository from "../domain/role.persistance.repository";

export default class GetRoleIdByRoleName {
    private readonly rolePersistanceRepository: RolePersistanceRepository

    constructor(rolePersistanceRepository: RolePersistanceRepository){
        this.rolePersistanceRepository = rolePersistanceRepository
    }

    async getRolId (roleName: string){
        try {
            const roleIdFound = await this.rolePersistanceRepository.getRoleIdByRoleName(roleName)

            if(!roleIdFound){
                throw new Error(`${roleName} role does not exist`)
            }

            return roleIdFound
            
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}