import Role from "../domain/role.model"
import RoleDTO from "../domain/role.dto"
import { validate } from "class-validator"

import RoleIdGeneratorRepository from "../domain/role.id.generator.repository"
import RolePersistanceRepository from "../domain/role.persistance.repository"

export default class InsertRole {
    private readonly rolePersistanceRepository: RolePersistanceRepository
    private readonly roleIdGeneratorRepository: RoleIdGeneratorRepository

    constructor(rolePersistanceRepository: RolePersistanceRepository, roleIdGeneratorRepository: RoleIdGeneratorRepository){
        this.rolePersistanceRepository = rolePersistanceRepository,
        this.roleIdGeneratorRepository = roleIdGeneratorRepository
    }
    
    async createRole (roleName: string, roleDescription: string) {
        try {
            const errorDataRole = await validate(new RoleDTO({
                roleName, 
                roleDescription
            }))
            if (errorDataRole.length > 0) {
                const errorMessages = errorDataRole.map((error) => error.constraints ? Object.values(error.constraints): []).flat()
                throw new Error(errorMessages.join(', '))
            }
    
            const roleId = this.roleIdGeneratorRepository.generateRoleId()
    
            const roleCreated = new Role({
                roleId,
                roleName, 
                roleDescription
            })
            const newRoleCreated = await this.rolePersistanceRepository.insertRole(roleCreated)
            return newRoleCreated
            
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}