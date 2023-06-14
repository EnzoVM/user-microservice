import RolePrismaRepository from "../../../../src/core/role/infraestructure/prisma/role.prisma.repository"
import RoleUuidRepository from "../../../../src/core/role/infraestructure/uuid/role.uuid.repository"
import InsertRole from "../../../../src/core/role/application/insert.role"

jest.mock("../../../../src/core/role/infraestructure/prisma/role.prisma.repository")
jest.mock("../../../../src/core/role/infraestructure/uuid/role.uuid.repository")

describe('Insert new role', () => {

    let rolePrismaRepository
    let roleUuidRepository

    beforeEach(() => {
        rolePrismaRepository = new RolePrismaRepository()
        roleUuidRepository = new RoleUuidRepository()
    })
    
    afterEach(() => {
        jest.restoreAllMocks()
    })


    test('Insert role successfully', async () => {
        const spyRole = jest.spyOn(rolePrismaRepository, 'insertRole')
        const spyRoleId = jest.spyOn(roleUuidRepository, 'generateRoleId')

        spyRoleId.mockReturnValue('fefef3f3f-4g4g4g4-f44')
        spyRole.mockResolvedValue({
            roleId: roleUuidRepository.generateRoleId(),
            roleName: 'Plato de fondo mock',
            roleDescription: 'Description of mock'
        })

        const insertRole = new InsertRole(rolePrismaRepository, roleUuidRepository)
        const roleSaved = await insertRole.createRole('Plato de fondo mock', 'Description of mock')

        expect(roleSaved.roleId).toStrictEqual('fefef3f3f-4g4g4g4-f44')
        expect(roleSaved.roleName).toStrictEqual('Plato de fondo mock')
    })


    test('When role name is missing', async () => {
        const insertRole = new InsertRole(rolePrismaRepository, roleUuidRepository)

        //Rola name is missing
        //@ts-ignore
        await expect(insertRole.createRole('Description of mock')).rejects.toBeInstanceOf(Error)
    })


    test('When role description is missing', async () => {
        const insertRole = new InsertRole(rolePrismaRepository, roleUuidRepository)

        //Rola description is missing
        //@ts-ignore
        await expect(insertRole.createRole('Plato de fondo mock')).rejects.toBeInstanceOf(Error)
    })


    test('when there is an error with generate ID', async () => {
        const spyRole = jest.spyOn(rolePrismaRepository, 'insertRole')
        const spyRoleId = jest.spyOn(roleUuidRepository, 'generateRoleId')

        spyRole.mockResolvedValue({
            roleId: roleUuidRepository.generateRoleId(),
            roleName: 'Plato de fondo mock',
            roleDescription: 'Description of mock'
        })

        spyRoleId.mockImplementation(() => {
            throw new Error('ERROR IN GENERATE ROLE ID')
        })

        const insertRole = new InsertRole(rolePrismaRepository, roleUuidRepository)

        await expect(insertRole.createRole('Plato de fondo mock', 'Description of mock')).rejects.toBeInstanceOf(Error)
    })
    

    test('when there is an error with save role', async () => {
        const spyRole = jest.spyOn(rolePrismaRepository, 'insertRole')
        const spyRoleId = jest.spyOn(roleUuidRepository, 'generateRoleId')

        spyRoleId.mockReturnValue('fefef3f3f-4g4g4g4-f44')
        spyRole.mockRejectedValue(new Error('ERROR IN INSERT NEW ROLE'))

        const insertRole = new InsertRole(rolePrismaRepository, roleUuidRepository)

        await expect(insertRole.createRole('Plato de fondo mock', 'Description of mock')).rejects.toBeInstanceOf(Error)
    })
})
