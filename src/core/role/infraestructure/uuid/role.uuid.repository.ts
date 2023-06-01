import RoleIdGeneratorRepository from "../../domain/role.id.generator.repository";
import { v4 as uuid } from 'uuid'

export default class RoleUuidRepository implements RoleIdGeneratorRepository{
    
    generateRoleId (): string {
        try {

            return uuid()
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}