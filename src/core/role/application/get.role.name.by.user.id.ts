import RolePersistanceRepository from "../domain/role.persistance.repository";

export default class GetRoleNameByUserId {
    private readonly rolePersistanceRepository: RolePersistanceRepository

    constructor(rolePersistanceRepository: RolePersistanceRepository) {
        this.rolePersistanceRepository = rolePersistanceRepository
    }

    async getRoleName (userId: bigint) {
        try {
            const roleFound = await this.rolePersistanceRepository.getRoleNameByUserId(userId)

            if(!roleFound){
                throw new Error('The id entered is not assigned a role')
            }
            
            return roleFound.roleName

        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}