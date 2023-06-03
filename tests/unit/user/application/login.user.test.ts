import LoginUser from "../../../../src/core/user/application/login.user"
import jwt from 'jsonwebtoken'
import UserPrismaRepository from "../../../../src/core/user/infraestructure/prisma/user.prisma.repository"
import UserBcryptRepository from "../../../../src/core/user/infraestructure/bcrypt/user.bcrypt.repository"
import RolePrismaRepository from "../../../../src/core/role/infraestructure/prisma/role.prisma.repository"

jest.mock("jsonwebtoken")
jest.mock("../../../../src/core/user/infraestructure/prisma/user.prisma.repository")
jest.mock("../../../../src/core/user/infraestructure/bcrypt/user.bcrypt.repository")
jest.mock("../../../../src/core/role/infraestructure/prisma/role.prisma.repository")

describe('Login user', () => {
    
    test('User should login successfully', async () => {
        const userPrismaRepository = new UserPrismaRepository()
        const userBcryptRepository = new UserBcryptRepository()
        const rolePrismaRepository = new RolePrismaRepository()

        const spyLogin = jest.spyOn(userPrismaRepository, 'getUserByEmail')
        const spyPasswordEncrypted = jest.spyOn(userBcryptRepository, 'decryptUserPassword')
        const spyUserRole = jest.spyOn(rolePrismaRepository, 'getRoleNameByRoleId')

        spyLogin.mockResolvedValue({
            userId: BigInt(3689634701458564194),
            userName: 'EmployeePrueba2000000000',
            userLastname: 'employee',
            userDNI: 74563334,
            userPhoneNumber: '+345678546789',
            userEmail: 'employeeeeeeeWWWWe@gmail.com',
            userPassword: '$2b$10$zQ3iBPRFaOdwBN4YpVWp3.BCXjPgBejiz7vIloLmZSP0x6eaFuL7K',
            roleId: '8f323445-48ea-4067-8a13-e8fa1f746e95'
        })

        spyPasswordEncrypted.mockResolvedValue(true)
        spyUserRole.mockResolvedValue('Owner')
        jwt.sign = jest.fn().mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vy')

        const loginUser = new LoginUser(userPrismaRepository, userBcryptRepository, rolePrismaRepository)
        const userLogged = await loginUser.login('enzoprueba@gmail.com','passwordPrueba')

        expect(userLogged).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vy')
    })


    test('When some or all parameters are missing', async () => {
        const userPrismaRepository = new UserPrismaRepository()
        const userBcryptRepository = new UserBcryptRepository()
        const rolePrismaRepository = new RolePrismaRepository()

        const loginUser = new LoginUser(userPrismaRepository, userBcryptRepository, rolePrismaRepository)
        
        //Email is missing
        //@ts-ignore
        await expect(loginUser.login('passwordPrueba')).rejects.toBeInstanceOf(Error)
    })


    test('When some or all parameters are incorrect', async () => {
        const userPrismaRepository = new UserPrismaRepository()
        const userBcryptRepository = new UserBcryptRepository()
        const rolePrismaRepository = new RolePrismaRepository()

        const loginUser = new LoginUser(userPrismaRepository, userBcryptRepository, rolePrismaRepository)
        
        //Email validate is wrong and Password must be a string
        //@ts-ignore
        await expect(loginUser.login('enzopruegmail.com', 123344)).rejects.toBeInstanceOf(Error)
    })


    test('When user email has not been found', async () => {
        const userPrismaRepository = new UserPrismaRepository()
        const userBcryptRepository = new UserBcryptRepository()
        const rolePrismaRepository = new RolePrismaRepository()

        const spyLogin = jest.spyOn(userPrismaRepository, 'getUserByEmail')
        const spyPasswordEncrypted = jest.spyOn(userBcryptRepository, 'decryptUserPassword')
        const spyUserRole = jest.spyOn(rolePrismaRepository, 'getRoleNameByRoleId')

        //User not found
        spyLogin.mockResolvedValue(null)
        spyPasswordEncrypted.mockResolvedValue(true)
        spyUserRole.mockResolvedValue('Owner')
        jwt.sign = jest.fn().mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vy')

        const loginUser = new LoginUser(userPrismaRepository, userBcryptRepository, rolePrismaRepository)

        await expect(loginUser.login('enzopr@gmail.com','passwordPrueba')).rejects.toBeInstanceOf(Error)
    })


    test('When there is an error when getting the user', async () => {
        const userPrismaRepository = new UserPrismaRepository()
        const userBcryptRepository = new UserBcryptRepository()
        const rolePrismaRepository = new RolePrismaRepository()

        const spyLogin = jest.spyOn(userPrismaRepository, 'getUserByEmail')
        const spyPasswordEncrypted = jest.spyOn(userBcryptRepository, 'decryptUserPassword')
        const spyUserRole = jest.spyOn(rolePrismaRepository, 'getRoleNameByRoleId')

        //User not found
        spyLogin.mockRejectedValue(new Error('ERROR IN GET USER'))
        spyPasswordEncrypted.mockResolvedValue(true)
        spyUserRole.mockResolvedValue('Owner')
        jwt.sign = jest.fn().mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vy')

        const loginUser = new LoginUser(userPrismaRepository, userBcryptRepository, rolePrismaRepository)

        await expect(loginUser.login('enzopr@gmail.com','passwordPrueba')).rejects.toBeInstanceOf(Error)
    })


    test('When user password does not coincide', async () => {
        const userPrismaRepository = new UserPrismaRepository()
        const userBcryptRepository = new UserBcryptRepository()
        const rolePrismaRepository = new RolePrismaRepository()

        const spyLogin = jest.spyOn(userPrismaRepository, 'getUserByEmail')
        const spyPasswordEncrypted = jest.spyOn(userBcryptRepository, 'decryptUserPassword')
        const spyUserRole = jest.spyOn(rolePrismaRepository, 'getRoleNameByRoleId')

        spyLogin.mockResolvedValue({
            userId: BigInt(3689634701458564194),
            userName: 'EmployeePrueba2000000000',
            userLastname: 'employee',
            userDNI: 74563334,
            userPhoneNumber: '+345678546789',
            userEmail: 'employeeeeeeeWWWWe@gmail.com',
            userPassword: '$2b$10$zQ3iBPRFaOdwBN4YpVWp3.BCXjPgBejiz7vIloLmZSP0x6eaFuL7K',
            roleId: '8f323445-48ea-4067-8a13-e8fa1f746e95'
        })

        //Password is incorrect
        spyPasswordEncrypted.mockResolvedValue(false)
        spyUserRole.mockResolvedValue('Owner')
        jwt.sign = jest.fn().mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vy')

        const loginUser = new LoginUser(userPrismaRepository, userBcryptRepository, rolePrismaRepository)

        await expect(loginUser.login('enzoprueba@gmail.com','passwordPruebafrfr')).rejects.toBeInstanceOf(Error)
    })


    test('when there is an error with the password decryption', async () => {
        const userPrismaRepository = new UserPrismaRepository()
        const userBcryptRepository = new UserBcryptRepository()
        const rolePrismaRepository = new RolePrismaRepository()

        const spyLogin = jest.spyOn(userPrismaRepository, 'getUserByEmail')
        const spyPasswordEncrypted = jest.spyOn(userBcryptRepository, 'decryptUserPassword')
        const spyUserRole = jest.spyOn(rolePrismaRepository, 'getRoleNameByRoleId')

        spyLogin.mockResolvedValue({
            userId: BigInt(3689634701458564194),
            userName: 'EmployeePrueba2000000000',
            userLastname: 'employee',
            userDNI: 74563334,
            userPhoneNumber: '+345678546789',
            userEmail: 'employeeeeeeeWWWWe@gmail.com',
            userPassword: '$2b$10$zQ3iBPRFaOdwBN4YpVWp3.BCXjPgBejiz7vIloLmZSP0x6eaFuL7K',
            roleId: '8f323445-48ea-4067-8a13-e8fa1f746e95'
        })

        //Error in Password
        spyPasswordEncrypted.mockRejectedValue(new Error('ERROR IN DECRYPT PASSWORD'))
        spyUserRole.mockResolvedValue('Owner')
        jwt.sign = jest.fn().mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vy')

        const loginUser = new LoginUser(userPrismaRepository, userBcryptRepository, rolePrismaRepository)

        await expect(loginUser.login('enzoprueba@gmail.com','passwordPruebafrfr')).rejects.toBeInstanceOf(Error)
    })

    
    test('When user role has not been found', async () => {
        const userPrismaRepository = new UserPrismaRepository()
        const userBcryptRepository = new UserBcryptRepository()
        const rolePrismaRepository = new RolePrismaRepository()

        const spyLogin = jest.spyOn(userPrismaRepository, 'getUserByEmail')
        const spyPasswordEncrypted = jest.spyOn(userBcryptRepository, 'decryptUserPassword')
        const spyUserRole = jest.spyOn(rolePrismaRepository, 'getRoleNameByRoleId')

        spyLogin.mockResolvedValue({
            userId: BigInt(3689634701458564194),
            userName: 'EmployeePrueba2000000000',
            userLastname: 'employee',
            userDNI: 74563334,
            userPhoneNumber: '+345678546789',
            userEmail: 'employeeeeeeeWWWWe@gmail.com',
            userPassword: '$2b$10$zQ3iBPRFaOdwBN4YpVWp3.BCXjPgBejiz7vIloLmZSP0x6eaFuL7K',
            roleId: '8f323445-48ea-4067-8a13-e8fa1f746e95'
        })

        spyPasswordEncrypted.mockResolvedValue(true)
        //role user not found
        spyUserRole.mockResolvedValue('')  
        jwt.sign = jest.fn().mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vy')

        const loginUser = new LoginUser(userPrismaRepository, userBcryptRepository, rolePrismaRepository)

        await expect(loginUser.login('enzoprueba@gmail.com','passwordPrueba')).rejects.toBeInstanceOf(Error)
    })
})