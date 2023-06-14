import RolePrismaRepository from "../../../../src/core/role/infraestructure/prisma/role.prisma.repository"
import GetRoleIdByRoleName from "../../../../src/core/role/application/get.role.id.by.role.name"

jest.mock("../../../../src/core/role/infraestructure/prisma/role.prisma.repository")

describe('Get Role ID by role name', () => {

    let rolePrismaRepository

    beforeEach(() => {
        rolePrismaRepository = new RolePrismaRepository()
    })
    
    afterEach(() => {
        jest.restoreAllMocks()
    })


    test('Get Role ID successfully', async () => {
        const spyRole = jest.spyOn(rolePrismaRepository, 'getRoleIdByRoleName')
        spyRole.mockResolvedValue('344f4fmrimf4mf-4gj4gi4g4-g4g4g4g4')

        const getRoleIdByRoleName = new GetRoleIdByRoleName(rolePrismaRepository)
        const roleIdFound = await getRoleIdByRoleName.getRolId('Owner')

        expect(roleIdFound).toStrictEqual('344f4fmrimf4mf-4gj4gi4g4-g4g4g4g4')
    })


    test('When role id not found', async () => {
        const spyRole = jest.spyOn(rolePrismaRepository, 'getRoleIdByRoleName')
        spyRole.mockResolvedValue(null)

        const getRoleIdByRoleName = new GetRoleIdByRoleName(rolePrismaRepository)

        await expect(getRoleIdByRoleName.getRolId('Owner')).rejects.toBeInstanceOf(Error)
    })

    test('When there is an error with get rol id', async () => {
        const spyRole = jest.spyOn(rolePrismaRepository, 'getRoleIdByRoleName')
        spyRole.mockRejectedValue(new Error("ERROR IN GET ROLE ID"))

        const getRoleIdByRoleName = new GetRoleIdByRoleName(rolePrismaRepository)

        await expect(getRoleIdByRoleName.getRolId('Owner')).rejects.toBeInstanceOf(Error)
    })
})