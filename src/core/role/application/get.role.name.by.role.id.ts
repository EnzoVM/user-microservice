import RolePersistanceRepository from "../domain/role.persistance.repository"

export default class GetRoleNameByRoleId {
    private readonly rolePersistanceRepository: RolePersistanceRepository

    constructor(rolePersistanceRepository: RolePersistanceRepository){
        this.rolePersistanceRepository = rolePersistanceRepository
    }

    async getRoleName (roleId: string){
        try {
            const roleNameFound = await this.rolePersistanceRepository.getRoleNameByRoleId(roleId)
            
            if(!roleNameFound){
                throw new Error('Role does not exist')
            }

            return roleNameFound

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}