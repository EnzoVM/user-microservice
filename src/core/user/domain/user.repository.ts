import IUser from "./user.interface";
import User from "./user.model";

export default interface UserRepository {

    addOwnerRestaurant: (user: User) => Promise<IUser>

}