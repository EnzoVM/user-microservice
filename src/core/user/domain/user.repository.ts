import User from "./user.model";

export default interface UserRepository {

    insertUser: (user: User) => Promise<User>
    getRoleIdUserByIdentification: (userId: bigint) => Promise<string | null>
    loginUser: (userEmail: string) => Promise<User | null>
    
}