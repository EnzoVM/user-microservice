import User from "../domain/user.model";
import UserRepository from "../domain/user.repository";
import bcrypt from 'bcrypt'
import UserDTO from "../domain/user.dto";
import { validate } from "class-validator";
import GetIdByRoleName from "../../role/application/get.id.by.role.name";
import RolePrismaRepository from "../../role/infraestructure/role.prisma.repository";

const getIdByRoleName = new GetIdByRoleName(new RolePrismaRepository)

export default class CreateRestaurantOwner {
    private readonly userRepository: UserRepository

    constructor(userRepository){
        this.userRepository = userRepository
    }

    async createRestaurantOwner (userName: string, userLastname: string, userDNI: number, userPhoneNumber: string, userEmail: string, userPassword: string){
        const restaurantOwnerPasswordEncrypted = await bcrypt.hash(userPassword, 10)
        
        const errorDataUser = await validate(new UserDTO(userName, userLastname, userDNI, userPhoneNumber, userEmail, restaurantOwnerPasswordEncrypted))
        if (errorDataUser.length > 0) {
            throw new Error ('Algunos datos ingresados son incorrectos, favor de revisar')
        }
        
        const roleId = await getIdByRoleName.getIdByRoleName("Owner")

        if(roleId !== null){
            const newOwnerRestaurant = new User(userName, userLastname, userDNI, userPhoneNumber, userEmail, restaurantOwnerPasswordEncrypted, roleId)
            const ownerRestaurantAdded = await this.userRepository.insertRestaurantOwner(newOwnerRestaurant)
            return ownerRestaurantAdded
        }
        
    }
}
