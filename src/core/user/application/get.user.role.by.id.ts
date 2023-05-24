import UserRepository from "../domain/user.repository";
import GetRoleNameById from "../../role/application/get.role.by.id"
import RolePrismaRepository from "../../role/infraestructure/role.prisma.repository"

const getRoleNameById = new GetRoleNameById(new RolePrismaRepository)

export default class GetUserRoleById {
    private readonly userRepository: UserRepository

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository
    }

    async getUserRoleById (userId: bigint) {
        const userFound = await this.userRepository.getUserById(userId)

        if(userFound !== null){
            const roleNameUser = await getRoleNameById.getRoleNameById(userFound.roleId)
            return roleNameUser
        }
    }
}