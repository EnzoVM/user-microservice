import RolePrismaRepository from "../../../../src/core/role/infraestructure/prisma/role.prisma.repository"
import GetRoleNameByRoleId from "../../../../src/core/role/application/get.role.name.by.role.id"

jest.mock("../../../../src/core/role/infraestructure/prisma/role.prisma.repository")

describe('Get role name by role id', () => {

    let rolePrismaRepository

    beforeEach(() => {
        rolePrismaRepository = new RolePrismaRepository()
    })
    
    afterEach(() => {
        jest.restoreAllMocks()
    })

    
    test('Get role name successfully', async () => {
        const spyRole = jest.spyOn(rolePrismaRepository, 'getRoleNameByRoleId')
        spyRole.mockResolvedValue('Owner')

        const getRoleNameByRoleId = new GetRoleNameByRoleId(rolePrismaRepository)
        const roleNameFound = await getRoleNameByRoleId.getRoleName('effefefefef-tbtg5g4f4-5g5g5g5')

        expect(roleNameFound).toStrictEqual('Owner')
    })
    

    test('When role id not found', async () => {
        const spyRole = jest.spyOn(rolePrismaRepository, 'getRoleNameByRoleId')
        spyRole.mockResolvedValue(null)

        const getRoleNameByRoleId = new GetRoleNameByRoleId(rolePrismaRepository)

        await expect(getRoleNameByRoleId.getRoleName('effefefefef-tbtg5g4f4-5g5g5g5')).rejects.toBeInstanceOf(Error)
    })

    test('When there is an error with get rol id', async () => {
        const spyRole = jest.spyOn(rolePrismaRepository, 'getRoleNameByRoleId')
        spyRole.mockRejectedValue(new Error('ERROR IN GET ROLE NAME'))

        const getRoleNameByRoleId = new GetRoleNameByRoleId(rolePrismaRepository)

        await expect(getRoleNameByRoleId.getRoleName('effefefefef-tbtg5g4f4-5g5g5g5')).rejects.toBeInstanceOf(Error)
    })
})