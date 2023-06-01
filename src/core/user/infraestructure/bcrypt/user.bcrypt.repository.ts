import UserPasswordGeneratorRepository from "../../domain/user.password.generator.repository"
import bcrypt from 'bcrypt'

export default class UserBcryptRepository implements UserPasswordGeneratorRepository{
    
    async generateUserPassword (userPassword: string): Promise<string> {
        try {
            
            const userPasswordEncrypted = await bcrypt.hash(userPassword, 10)
            return userPasswordEncrypted

        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    async decryptUserPassword (passwordEntered: string ,userPassword: string): Promise<boolean> {
        try {

            const passwordDecrypted = await bcrypt.compare(passwordEntered, userPassword)
            return passwordDecrypted

        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}