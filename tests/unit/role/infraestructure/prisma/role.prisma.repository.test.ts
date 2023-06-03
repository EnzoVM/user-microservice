import prisma from "../../../../../src/connections/prisma.connection"
import RolePrismaRepository from "../../../../../src/core/role/infraestructure/prisma/role.prisma.repository"

jest.mock("../../../../../src/connections/prisma.connection", () => ({
    __esModule: true,
    default: {
        role: {
        create: jest.fn(),
        findFirst: jest.fn(),
        findUnique: jest.fn()
        }
    },
}))


describe('Role Prisma Repository', () => {

    let rolePrismaRepository: RolePrismaRepository

    beforeEach(() => {
        rolePrismaRepository = new RolePrismaRepository(),
        jest.clearAllMocks()
    })


    test('Should insert role successfully', async () => {
        const spyPrisma = jest.spyOn(prisma.role, 'create')
        
        const role = {
            roleId: 'fefef3f3f-4g4g4g4-f44',
            roleName: 'Plato de fondo mock',
            roleDescription: 'Description of mock'
        }

        spyPrisma.mockResolvedValue(role)

        const roleSaved = await rolePrismaRepository.insertRole(role)

        expect(roleSaved).toEqual(role)
        expect(roleSaved.roleName).toStrictEqual('Plato de fondo mock')
    })


    test('Where there is an error in prisma create role', async () => {
        const spyPrisma = jest.spyOn(prisma.role, 'create')
        
        const role = {
            roleId: 'fefef3f3f-4g4g4g4-f44',
            roleName: 'Plato de fondo mock',
            roleDescription: 'Description of mock'
        }

        spyPrisma.mockRejectedValue(new Error('ERROR IN PRISMA CREATE ROLE'))

        await expect(rolePrismaRepository.insertRole(role)).rejects.toBeInstanceOf(Error)
    })


    test('Should get role id by role name', async () => {
        const spyPrisma = jest.spyOn(prisma.role, 'findFirst')
        
        //@ts-ignore
        spyPrisma.mockResolvedValue({ roleId: '41e37092-13fc-47c5c888'})

        const roleIdFound = await rolePrismaRepository.getRoleIdByRoleName('Owner')

        expect(roleIdFound).toStrictEqual('41e37092-13fc-47c5c888')
    })


    test('When the role id not found', async () => {
        const spyPrisma = jest.spyOn(prisma.role, 'findFirst')
        
        spyPrisma.mockResolvedValueOnce(null)

        const roleIdNotFound = await rolePrismaRepository.getRoleIdByRoleName('Owner')

        expect(roleIdNotFound).toBe(null)
    })


    test('When there is an error in prisma get role id by role name', async () => {
        const spyPrisma = jest.spyOn(prisma.role, 'findFirst')
        
        spyPrisma.mockRejectedValue(new Error('ERROR IN PRISMA GET ROLE ID'))

        await expect(rolePrismaRepository.getRoleIdByRoleName('Owner')).rejects.toBeInstanceOf(Error)
    })


    test('Should get role name by role id', async () => {
        const spyPrisma = jest.spyOn(prisma.role, 'findUnique')
        
        //@ts-ignore
        spyPrisma.mockResolvedValue({ roleName: 'Owner'})

        const roleNameFound = await rolePrismaRepository.getRoleNameByRoleId('33545435-r4f4f4-g4g4g-f4')

        expect(roleNameFound).toStrictEqual('Owner')
    })


    test('When the role name not found', async () => {
        const spyPrisma = jest.spyOn(prisma.role, 'findUnique')
        
        spyPrisma.mockResolvedValueOnce(null)

        const roleNameNotFound = await rolePrismaRepository.getRoleNameByRoleId('33545435-r4f4f4-g4g4g-f4')

        expect(roleNameNotFound).toBe(null)
    })


    test('When there is an error in prisma get role name by role id', async () => {
        const spyPrisma = jest.spyOn(prisma.role, 'findUnique')
        
        spyPrisma.mockRejectedValue(new Error('ERROR IN PRISMA GET ROLE ID'))

        await expect(rolePrismaRepository.getRoleNameByRoleId('33545435-r4f4f4-g4g4g-f4')).rejects.toBeInstanceOf(Error)
    })


    test('Should get role name by user id', async () => {
        const spyPrisma = jest.spyOn(prisma.role, 'findFirst')
        
        spyPrisma.mockResolvedValue({
            roleId: 'f4f4frg4g-5h5h5g5fd4d4-g4',
            roleName: 'Owner',
            roleDescription: 'Description mock'
        })

        const roleNameFound = await rolePrismaRepository.getRoleNameByUserId(BigInt(3343535464757585))

        expect(roleNameFound?.roleName).toStrictEqual('Owner')
    })


    test('When there is an error in prisma get role name by user id', async () => {
        const spyPrisma = jest.spyOn(prisma.role, 'findFirst')
        
        spyPrisma.mockRejectedValue(new Error('ERROR IN PRISMA GET ROLE ID'))

        await expect(rolePrismaRepository.getRoleNameByUserId(BigInt(3343535464757585))).rejects.toBeInstanceOf(Error)
    })
})