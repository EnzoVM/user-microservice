import User from "../domain/user.model";
import UserRepository from "../domain/user.repository"
import UserDTO from "../domain/user.dto";
import { validate } from "class-validator";
import GetIdByRoleName from "../../role/application/get.id.by.role.name";
import RolePrismaRepository from "../../role/infraestructure/role.prisma.repository";
import { addRestaurantEmployee } from "../infraestructure/services/restaurant.service";

const getIdByRoleName = new GetIdByRoleName(new RolePrismaRepository)

export default class CreateUser {
    private readonly userRepository: UserRepository

    constructor(userRepository){
        this.userRepository = userRepository
    }

    async createRestaurantOwner (userName: string, userLastname: string, userDNI: number, userPhoneNumber: string, userEmail: string, userPassword: string){
        
        if(!userName || !userLastname || !userDNI || !userPhoneNumber || !userEmail || !userPassword){
            throw new Error ('Data is missing')
        }

        const errorDataUser = await validate(new UserDTO(userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword))
        if (errorDataUser.length > 0) {
            throw new Error ('You have to specify the requested data')
        }
        
        const roleId = await getIdByRoleName.getIdByRoleName("Owner")

        if(roleId !== null){
            const newOwnerRestaurant = new User(userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword, roleId)
            const ownerRestaurantAdded = await this.userRepository.insertUser(newOwnerRestaurant)
            return ownerRestaurantAdded
        }
        
    }


    async createRestaurantEmployee (userName: string, userLastname: string, userDNI: number, userPhoneNumber: string, userEmail: string, userPassword: string, restaurantId: string){
        
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

        const newRestaurantEmployee = new User(userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword, roleId)
        const restaurantEmployeeAdded = await this.userRepository.insertUser(newRestaurantEmployee)

        //Insert an employee in a restaurant
        await addRestaurantEmployee(restaurantId, restaurantEmployeeAdded.userId.toString())
        
        return restaurantEmployeeAdded
        
    }
}
