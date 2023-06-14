import RolePrismaRepository from "../../../../src/core/role/infraestructure/prisma/role.prisma.repository"
import GetRoleNameByUserId from "../../../../src/core/role/application/get.role.name.by.user.id"

jest.mock("../../../../src/core/role/infraestructure/prisma/role.prisma.repository")

describe('Get role name by user id', () => {

    let rolePrismaRepository

    beforeEach(() => {
        rolePrismaRepository = new RolePrismaRepository()
    })
    
    afterEach(() => {
        jest.restoreAllMocks()
    })


    test('Get role name successfully', async () => {
        const spyRole = jest.spyOn(rolePrismaRepository, 'getRoleNameByUserId')
        spyRole.mockResolvedValue({
            roleId: 'd344f4f4f-5gg4g4f-5y5h5j6j',
            roleName: 'New role mock',
            roleDescription: 'Description of new role mock'
        })

        const getRoleNameByUserId = new GetRoleNameByUserId(rolePrismaRepository)
        const roleNameFound = await getRoleNameByUserId.getRoleName(BigInt(3293943935394002404924))

        expect(roleNameFound).toStrictEqual('New role mock')
    })
    

    test('When role id not found', async () => {
        const spyRole = jest.spyOn(rolePrismaRepository, 'getRoleNameByUserId')
        spyRole.mockResolvedValue(null)

        const getRoleNameByUserId = new GetRoleNameByUserId(rolePrismaRepository)

        await expect(getRoleNameByUserId.getRoleName(BigInt(434343433223242))).rejects.toBeInstanceOf(Error)
    })

    test('When there is an error with get rol id', async () => {
        const spyRole = jest.spyOn(rolePrismaRepository, 'getRoleNameByUserId')
        spyRole.mockRejectedValue(new Error('ERROR IN GET ROLE NAME'))

        const getRoleNameByUserId = new GetRoleNameByUserId(rolePrismaRepository)

        await expect(getRoleNameByUserId.getRoleName(BigInt(3293943935394002404924))).rejects.toBeInstanceOf(Error)
    })
})