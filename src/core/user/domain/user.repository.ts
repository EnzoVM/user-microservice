import User from "./user.model";

export default interface UserRepository {

    insertUser: (user: User) => Promise<User>
    getUserById: (userId: bigint) => Promise<User | null>
    loginUser: (userEmail: string) => Promise<User | null>

}