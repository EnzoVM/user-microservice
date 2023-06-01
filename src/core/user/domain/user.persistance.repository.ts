import User from "./user.model";

export default interface UserPersistanceRepository {

    insertUser: (user: User) => Promise<User>
    getUserByEmail: (userEmail: string) => Promise<User | null>

}