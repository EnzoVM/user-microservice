import User from "../domain/user.model";
import UserRepository from "../domain/user.repository"
import UserDTO from "../domain/user.dto";
import { validate } from "class-validator";
import GetIdByRoleName from "../../role/application/get.id.by.role.name";
import RolePrismaRepository from "../../role/infraestructure/role.prisma.repository";
import UserServiceRepository from "../domain/user.service.repository";

const getIdByRoleName = new GetIdByRoleName(new RolePrismaRepository)

export default class InsertUser {
    private readonly userRepository: UserRepository
    private readonly userServiceRepository: UserServiceRepository

    constructor(userRepository: UserRepository, userServiceRepository: UserServiceRepository){
        this.userRepository = userRepository,
        this.userServiceRepository = userServiceRepository
    }

    async createOwner (userName: string, userLastname: string, userDNI: number, userPhoneNumber: string, userEmail: string, userPassword: string){
        
        if(!userName || !userLastname || !userDNI || !userPhoneNumber || !userEmail || !userPassword){
            throw new Error ('Data is missing')
        }

        const errorDataUser = await validate(new UserDTO(userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword))
        if (errorDataUser.length > 0) {
            throw new Error ('You have to specify the requested data')
        }
        
        const roleId = await getIdByRoleName.getIdByRoleName("Owner")
        if(roleId === null){
            throw new Error('Owner role does not exist')
        }

        const newOwner = new User(userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword, roleId)
        const ownerAdded = await this.userRepository.insertUser(newOwner)
        return ownerAdded
    }


    async createEmployee (userName: string, userLastname: string, userDNI: number, userPhoneNumber: string, userEmail: string, userPassword: string, restaurantId: string){
        
        if(!userName || !userLastname || !userDNI || !userPhoneNumber || !userEmail || !userPassword || !restaurantId){
            throw new Error ('Data is missing')
        }

        const errorDataUser = await validate(new UserDTO(userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword))
        if (errorDataUser.length > 0) {
            throw new Error ('You have to specify the requested data')
        }
        
        const roleId = await getIdByRoleName.getIdByRoleName("Employee")
        if(roleId === null){
            throw new Error('Employee role does not exist')
        }

        const newEmployee = new User(userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword, roleId)
        const employeeAdded = await this.userRepository.insertUser(newEmployee)

        //Insert an employee in a restaurant
        const message = await this.userServiceRepository.addRestaurantEmployee(restaurantId, employeeAdded.userId.toString())
        console.log(message);
        
        return employeeAdded
        
    }

    async createClient (userName: string, userLastname: string, userDNI: number, userPhoneNumber: string, userEmail: string, userPassword: string){
        
        if(!userName || !userLastname || !userDNI || !userPhoneNumber || !userEmail || !userPassword){
            throw new Error ('Data is missing')
        }

        const errorDataUser = await validate(new UserDTO(userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword))
        if (errorDataUser.length > 0) {
            throw new Error ('You have to specify the requested data')
        }
        
        const roleId = await getIdByRoleName.getIdByRoleName("Client")
        if(roleId === null){
            throw new Error('Client role does not exist')
        }

        const newClient = new User(userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword, roleId)
        const clientAdded = await this.userRepository.insertUser(newClient)
        
        return clientAdded
        
    }
}
