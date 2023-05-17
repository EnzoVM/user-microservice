import User from "./user.model";

export default interface UserRepository {

    insertRestaurantOwner: (user: User) => Promise<User>
    
}