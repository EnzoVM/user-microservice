import UserRepository from "../domain/user.repository";
import GetRoleNameById from "../../role/application/get.role.by.id";
import RolePrismaRepository from "../../role/infraestructure/role.prisma.repository";

const getRoleNameById = new GetRoleNameById(new RolePrismaRepository)

export default class GetRoleUserByIdentification {
    private readonly userRepository: UserRepository

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository
    }

    async getRoleUserById (userId: bigint) {
        const roleIdUserFound = await this.userRepository.getRoleIdUserByIdentification(userId)

        if(roleIdUserFound !== null){
            const roleNameUser = await getRoleNameById.getRoleNameById(roleIdUserFound)
            return roleNameUser
        } 
    }
}