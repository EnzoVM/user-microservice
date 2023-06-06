import User from "../domain/user.model"
import UserDTO from "../domain/user.dto"
import { validate } from "class-validator"

import UserPersistanceRepository from "../domain/user.persistance.repository"
import UserServiceRepository from "../domain/user.service.repository"
import UserIdGeneratorRepository from "../domain/user.id.generator.repository"
import UserPasswordGeneratorRepository from "../domain/user.password.generator.repository"
import RolePersistanceRepository from "../../role/domain/role.persistance.repository"

export default class InsertUser {
    private readonly userPersistanceRepository: UserPersistanceRepository
    private readonly userServiceRepository: UserServiceRepository
    private readonly userIdGeneratorRepository: UserIdGeneratorRepository
    private readonly userPasswordGeneratorRepository: UserPasswordGeneratorRepository
    private readonly rolePersistanceRepository: RolePersistanceRepository
    
    constructor(userPersistanceRepository: UserPersistanceRepository, userServiceRepository: UserServiceRepository, userIdGeneratorRepository: UserIdGeneratorRepository, userPasswordGeneratorRepository: UserPasswordGeneratorRepository, rolePersistanceRepository: RolePersistanceRepository){
        this.userPersistanceRepository = userPersistanceRepository,
        this.userServiceRepository = userServiceRepository,
        this.userIdGeneratorRepository = userIdGeneratorRepository,
        this.userPasswordGeneratorRepository = userPasswordGeneratorRepository,
        this.rolePersistanceRepository = rolePersistanceRepository
    }

    async createOwner (userName: string, userLastname: string, userDNI: number, userPhoneNumber: string, userEmail: string, userPassword: string){
        try {
            //@ts-ignore
            const errorDataUser = await validate(new UserDTO({
                userName, 
                userLastname, 
                userDNI, 
                userPhoneNumber, 
                userEmail, 
                userPassword
            }), {groups: ['OwnerAndClientValidation']})       
            if (errorDataUser.length > 0) {
                const errorMessages = errorDataUser.map((error) => error.constraints ? Object.values(error.constraints): []).flat()
                throw new Error(errorMessages.join(', '))
            }
            
            const userId = this.userIdGeneratorRepository.generateUserId()
            const userPasswordEncrypted = await this.userPasswordGeneratorRepository.generateUserPassword(userPassword)
            const roleId = await this.rolePersistanceRepository.getRoleIdByRoleName('Owner')
            if(!roleId){
                throw new Error('Owner role does not exist')
            }

            const newOwner = new User({
                userId: userId,
                userName: userName, 
                userLastname: userLastname, 
                userDNI: userDNI, 
                userPhoneNumber: userPhoneNumber, 
                userEmail: userEmail, 
                userPassword: userPasswordEncrypted,
                roleId: roleId
            })
            const ownerAdded = await this.userPersistanceRepository.insertUser(newOwner)          
            return ownerAdded

        } catch (error: any) {
            throw new Error(error.message)
        }
    }


    async createEmployee (userName: string, userLastname: string, userDNI: number, userPhoneNumber: string, userEmail: string, userPassword: string, restaurantId: string){
        try {
            const errorDataUser = await validate(new UserDTO({
                userName, 
                userLastname, 
                userDNI, 
                userPhoneNumber, 
                userEmail, 
                userPassword,
                restaurantId
            }))      
            if (errorDataUser.length > 0) {
                const errorMessages = errorDataUser.map((error) => error.constraints ? Object.values(error.constraints): []).flat()
                throw new Error(errorMessages.join(', '))
            }
            
            const userId = this.userIdGeneratorRepository.generateUserId()
            const userPasswordEncrypted = await this.userPasswordGeneratorRepository.generateUserPassword(userPassword)
            const roleId = await this.rolePersistanceRepository.getRoleIdByRoleName('Employee')
            if(!roleId){
                throw new Error('Employee role does not exist')
            }
    
            const newEmployee = new User({
                userId: userId,
                userName: userName, 
                userLastname: userLastname, 
                userDNI: userDNI, 
                userPhoneNumber: userPhoneNumber, 
                userEmail: userEmail, 
                userPassword: userPasswordEncrypted,
                roleId: roleId
            })
            const employeeAdded = await this.userPersistanceRepository.insertUser(newEmployee)
    
            //Insert an employee in a restaurant
            const message = await this.userServiceRepository.addRestaurantEmployee(restaurantId, employeeAdded.userId.toString())
            console.log(message);
            
            return employeeAdded

        } catch (error: any) {
            throw new Error(error.message)
        }
    }


    async createClient (userName: string, userLastname: string, userDNI: number, userPhoneNumber: string, userEmail: string, userPassword: string){
        try {
            //@ts-ignore
            const errorDataUser = await validate(new UserDTO({
                userName, 
                userLastname, 
                userDNI, 
                userPhoneNumber, 
                userEmail, 
                userPassword
            }), {groups: ['OwnerAndClientValidation']})      
            if (errorDataUser.length > 0) {
                const errorMessages = errorDataUser.map((error) => error.constraints ? Object.values(error.constraints): []).flat()
                throw new Error(errorMessages.join(', '))
            }
                    
            const userId = this.userIdGeneratorRepository.generateUserId()
            const userPasswordEncrypted = await this.userPasswordGeneratorRepository.generateUserPassword(userPassword)
            const roleId = await this.rolePersistanceRepository.getRoleIdByRoleName('Client')
            if(!roleId){
                throw new Error('Client role does not exist')
            }
            
            const newClient = new User({
                userId: userId,
                userName: userName, 
                userLastname: userLastname, 
                userDNI: userDNI, 
                userPhoneNumber: userPhoneNumber, 
                userEmail: userEmail, 
                userPassword: userPasswordEncrypted,
                roleId: roleId
            })
            const clientAdded = await this.userPersistanceRepository.insertUser(newClient)
            return clientAdded

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}
