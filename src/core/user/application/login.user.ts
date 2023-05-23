import UserRepository from "../domain/user.repository"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import GetRoleUserByIdentification from "./get.role.user.by.id"
import UserPrismaRepository from "../infraestructure/prisma/user.prisma.repository"

const getRoleUserByIdentification = new GetRoleUserByIdentification(new UserPrismaRepository)

export default class LoginUser {
    private readonly userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async login (userEmail: string, userPassword: string) {

        if(!userEmail || !userPassword){
            throw new Error('Data is missing')
        }
        
        const userFound = await this.userRepository.loginUser(userEmail)
        if(userFound === null){
            throw new Error('The email entered is not registered')
        }

        const userPasswordCompare = await bcrypt.compare(userPassword, userFound.userPassword)
        if(!userPasswordCompare){
            throw new Error('The password entered does not match')
        }
        
        //Get role user
        const userRole = await getRoleUserByIdentification.getRoleUserById(userFound.userId)

        const userToken = jwt.sign({
            userId: userFound.userId.toString(),
            userRole: userRole
        }, process.env.PRIVATE_KEY_TOKEN)

        return userToken
    }
}