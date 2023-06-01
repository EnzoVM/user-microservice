import prisma from "../../../../../src/connections/prisma.connection"
import UserPrismaRepository from "../../../../../src/core/user/infraestructure/prisma/user.prisma.repository"

jest.mock("../../../../../src/connections/prisma.connection", () => ({
    __esModule: true,
    default: {
        user: {
        create: jest.fn(),
        findFirst: jest.fn()
        }
    },
}))

describe('User Prima Repository', () => {
    
    let userPrismaRepository: UserPrismaRepository

    beforeEach(() => {
        userPrismaRepository = new UserPrismaRepository()
    })


    test('Should insert user successfully', async () => {
        const spyPrisma = jest.spyOn(prisma.user, 'create')

        const user = {
            userId: BigInt(2323992949292492492994),
            userName: 'John mock',
            userLastname: 'Doe',
            userDNI: 74563453,
            userPhoneNumber: '+135467545674',
            userEmail: 'john.doe@example.com',
            userPassword: '123456789',
            roleId: '41e37092-13fc-479c-9a1b'
        }

        spyPrisma.mockResolvedValue(user)

        const userSaved = await userPrismaRepository.insertUser(user)

        expect(userSaved).toEqual(user)
        expect(userSaved.userName).toStrictEqual('John mock')
    })


    test('When there is an error in prisma create user', async () => {
        const spyPrisma = jest.spyOn(prisma.user, 'create')

        const user = {
            userId: BigInt(2323992949292492492994),
            userName: 'John mock',
            userLastname: 'Doe',
            userDNI: 74563453,
            userPhoneNumber: '+135467545674',
            userEmail: 'john.doe@example.com',
            userPassword: '123456789',
            roleId: '41e37092-13fc-479c-9a1b'
        }

        spyPrisma.mockRejectedValue(new Error('ERROR IN PRISMA CREATE USER'))

        await expect(userPrismaRepository.insertUser(user)).rejects.toBeInstanceOf(Error)
    })


    test('Should get user by email successfully', async () => {
        const spyPrisma = jest.spyOn(prisma.user, 'findFirst')

        const user = {
            userId: BigInt(2323992949292492492994),
            userName: 'John encontrado mock',
            userLastname: 'Doe',
            userDNI: 74563453,
            userPhoneNumber: '+135467545674',
            userEmail: 'john.doe@example.com',
            userPassword: '123456789',
            roleId: '41e37092-13fc-479c-9a1b'
        }

        spyPrisma.mockResolvedValue(user)

        const userFound = await userPrismaRepository.getUserByEmail('enzoprueba@gmail.com')

        expect(userFound).toEqual(user)
        expect(userFound?.userName).toStrictEqual('John encontrado mock')
    })


    test('When there is an error in prisma get user by email', async () => {
        const spyPrisma = jest.spyOn(prisma.user, 'findFirst')

        const user = {
            userId: BigInt(2323992949292492492994),
            userName: 'John mock',
            userLastname: 'Doe',
            userDNI: 74563453,
            userPhoneNumber: '+135467545674',
            userEmail: 'john.doe@example.com',
            userPassword: '123456789',
            roleId: '41e37092-13fc-479c-9a1b'
        }

        spyPrisma.mockRejectedValue(new Error('ERROR IN PRISMA GET USER BY EMAIL'))

        await expect(userPrismaRepository.getUserByEmail('enzoprueba@gmail.com')).rejects.toBeInstanceOf(Error)
    })
})