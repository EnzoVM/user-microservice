import User from "../domain/user.model";
import UserRepository from "../domain/user.repository";

export default class UserUseCase {
    private readonly userRepository: UserRepository

    constructor(userRepository){
        this.userRepository = userRepository
    }

    async addNewOwnerRestaurant (userName: string, userLastname: string, userDNI: string, userPhoneNumber: number, userEmail: string, userPassword: string, roleId: string){
        const newOwnerRestaurant = new User(userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword, roleId)
        const ownerRestaurantAdded = await this.userRepository.addOwnerRestaurant(newOwnerRestaurant)
        return ownerRestaurantAdded  
    }
}