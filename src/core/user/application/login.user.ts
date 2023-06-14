import UserDTO from "../domain/user.dto"
import { validate } from "class-validator"
import jwt from 'jsonwebtoken'

import UserPersistanceRepository from "../domain/user.persistance.repository"
import UserPasswordGeneratorRepository from "../domain/user.password.generator.repository"
import RolePersistanceRepository from "../../role/domain/role.persistance.repository"

export default class LoginUser {
    private readonly userPersistanceRepository: UserPersistanceRepository
    private readonly userPasswordGeneratorRepository: UserPasswordGeneratorRepository
    private readonly rolePersistanceRepository: RolePersistanceRepository

    constructor(userPersistanceRepository: UserPersistanceRepository, userPasswordGeneratorRepository: UserPasswordGeneratorRepository, rolePersistanceRepository: RolePersistanceRepository) {
        this.userPersistanceRepository = userPersistanceRepository
        this.userPasswordGeneratorRepository = userPasswordGeneratorRepository
        this.rolePersistanceRepository = rolePersistanceRepository
    }

    async login (userEmail: string, userPassword: string) {
        try {
            //@ts-ignore
            const errorDataUser = await validate(new UserDTO({
                userEmail, 
                userPassword
            }), {groups: ['loginValidation']})             
            if (errorDataUser.length > 0) {
                const errorMessages = errorDataUser.map((error) => error.constraints ? Object.values(error.constraints): []).flat()
                throw new Error(errorMessages.join(', '))
            }
            
            const userFound = await this.userPersistanceRepository.getUserByEmail(userEmail)
            if(!userFound){
                throw new Error('The email entered is not registered')
            }
            
            const userPasswordCompare = await this.userPasswordGeneratorRepository.decryptUserPassword(userPassword, userFound.userPassword)       
            if(!userPasswordCompare){
                throw new Error('The password entered does not match')
            }
            
            //Get role user  
            const userRole = await this.rolePersistanceRepository.getRoleNameByRoleId(userFound.roleId)
            if(!userRole){
                throw new Error('User role not found')
            }            

            const userToken = jwt.sign({
                userId: userFound.userId.toString(),
                userRole: userRole
            }, process.env.PRIVATE_KEY_TOKEN)

            return userToken

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}