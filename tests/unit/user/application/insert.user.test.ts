import InsertUser from "../../../../src/core/user/application/insert.user"
import UserPrismaRepository from "../../../../src/core/user/infraestructure/prisma/user.prisma.repository"
import RestaurantServiceRepository from "../../../../src/core/user/infraestructure/services/restaurant.service.repository"
import UserUuidRepository from "../../../../src/core/user/infraestructure/uuid/user.uuid.repository"
import UserBcryptRepository from "../../../../src/core/user/infraestructure/bcrypt/user.bcrypt.repository"
import RolePrismaRepository from "../../../../src/core/role/infraestructure/prisma/role.prisma.repository"

jest.mock("../../../../src/core/user/infraestructure/prisma/user.prisma.repository")
jest.mock("../../../../src/core/user/infraestructure/services/restaurant.service.repository")
jest.mock("../../../../src/core/user/infraestructure/uuid/user.uuid.repository")
jest.mock("../../../../src/core/user/infraestructure/bcrypt/user.bcrypt.repository")
jest.mock("../../../../src/core/role/infraestructure/prisma/role.prisma.repository")

describe('Insert User', () => {

    let userPrismaRepository
    let restaurantServiceRepository
    let userUuidRepository
    let userBcryptRepository
    let rolePrismaRepository

    beforeEach(() => {
        userPrismaRepository = new UserPrismaRepository()
        restaurantServiceRepository = new RestaurantServiceRepository()
        userUuidRepository = new UserUuidRepository()
        userBcryptRepository = new UserBcryptRepository()
        rolePrismaRepository = new RolePrismaRepository()
    })
    
    afterEach(() => {
        jest.restoreAllMocks()
    })

    
    test('Should create a owner successfully', async () => {
        const spyCreateUser = jest.spyOn(userPrismaRepository, 'insertUser')
        const spyRestaurantService = jest.spyOn(restaurantServiceRepository, 'addRestaurantEmployee')
        const spyUserId = jest.spyOn(userUuidRepository, 'generateUserId')
        const spyUserPassword = jest.spyOn(userBcryptRepository, 'generateUserPassword')
        const spyRoleUserId = jest.spyOn(rolePrismaRepository, 'getRoleIdByRoleName')

        spyCreateUser.mockResolvedValue({
            userId: BigInt(7075489692244848952),
            userName: "OwnerMock",
            userLastname: "lastname mock",
            userDNI: 74563334,
            userPhoneNumber: "+345678546789",
            userEmail: "ownerpruebamock@gmail.com",
            userPassword: "$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf",
            roleId: "41e37092-13fc-479c-9a1b-576305c5c888"
        })

        spyUserId.mockReturnValue(BigInt(7075489692244848952))
        spyUserPassword.mockResolvedValue('$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf')
        spyRoleUserId.mockResolvedValue('41e37092-13fc-479c-9a1b-576305c5c888')
        spyRestaurantService.mockResolvedValue('Data is registered')

        const insertUser = new InsertUser(userPrismaRepository, restaurantServiceRepository, userUuidRepository, userBcryptRepository, rolePrismaRepository)
        const userSaved = await insertUser.createOwnerOrClient('Owner', 'OwnerMock', 'lastname mock', 74563334, '+345678546789', 'ownerpruebamock@gmail.com', '123456789')

        expect(userSaved.userName).toStrictEqual('OwnerMock')
    })


    test('Should create a client successfully', async () => {
        const spyCreateUser = jest.spyOn(userPrismaRepository, 'insertUser')
        const spyRestaurantService = jest.spyOn(restaurantServiceRepository, 'addRestaurantEmployee')
        const spyUserId = jest.spyOn(userUuidRepository, 'generateUserId')
        const spyUserPassword = jest.spyOn(userBcryptRepository, 'generateUserPassword')
        const spyRoleUserId = jest.spyOn(rolePrismaRepository, 'getRoleIdByRoleName')

        spyCreateUser.mockResolvedValue({
            userId: BigInt(7075489692244848952),
            userName: "ClientMock",
            userLastname: "lastname mock",
            userDNI: 74563334,
            userPhoneNumber: "+345678546789",
            userEmail: "clientpruebamock@gmail.com",
            userPassword: "$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf",
            roleId: "41e37092-13fc-479c-9a1b-576305c5c888"
        })

        spyUserId.mockReturnValue(BigInt(7075489692244848952))
        spyUserPassword.mockResolvedValue('$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf')
        spyRoleUserId.mockResolvedValue('41e37092-13fc-479c-9a1b-576305c5c888')
        spyRestaurantService.mockResolvedValue('Data is registered')

        const insertUser = new InsertUser(userPrismaRepository, restaurantServiceRepository, userUuidRepository, userBcryptRepository, rolePrismaRepository)
        const userSaved = await insertUser.createOwnerOrClient('Client', 'ClientMock', 'lastname mock', 74563334, '+345678546789', 'clientpruebamock@gmail.com', '123456789')

        expect(userSaved.userName).toStrictEqual('ClientMock')
    })


    test('Should create an employee successfully', async () => {
        const spyCreateUser = jest.spyOn(userPrismaRepository, 'insertUser')
        const spyRestaurantService = jest.spyOn(restaurantServiceRepository, 'addRestaurantEmployee')
        const spyUserId = jest.spyOn(userUuidRepository, 'generateUserId')
        const spyUserPassword = jest.spyOn(userBcryptRepository, 'generateUserPassword')
        const spyRoleUserId = jest.spyOn(rolePrismaRepository, 'getRoleIdByRoleName')

        spyCreateUser.mockResolvedValue({
            userId: BigInt(7075489692244848952),
            userName: "EmployeeMock",
            userLastname: "lastname mock",
            userDNI: 74563334,
            userPhoneNumber: "+345678546789",
            userEmail: "employeepruebamock@gmail.com",
            userPassword: "$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf",
            roleId: "41e37092-13fc-479c-9a1b-576305c5c888"
        })

        spyUserId.mockReturnValue(BigInt(7075489692244848952))
        spyUserPassword.mockResolvedValue('$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf')
        spyRoleUserId.mockResolvedValue('41e37092-13fc-479c-9a1b-576305c5c888')
        spyRestaurantService.mockResolvedValue('Data is registered')

        const insertUser = new InsertUser(userPrismaRepository, restaurantServiceRepository, userUuidRepository, userBcryptRepository, rolePrismaRepository)
        const userSaved = await insertUser.createEmployee('EmployeeMock', 'lastname mock', 74563334, '+345678546789', 'employeepruebamock@gmail.com', '123456789', 'de891602-ef54-46bc-9356-9e4bf666defc')

        expect(userSaved.userName).toStrictEqual('EmployeeMock')
    })


    test('When some or all parameters are missing', async () => {
        const insertUser = new InsertUser(userPrismaRepository, restaurantServiceRepository, userUuidRepository, userBcryptRepository, rolePrismaRepository)
        
        //Name and Email are missing
        //@ts-ignore
        await expect(insertUser.createOwnerOrClient('Owner', 'lastname mock', 74563334, '+345678546789', '123456789')).rejects.toBeInstanceOf(Error)
    })


    test('When some or all parameters are missing', async () => {
        const insertUser = new InsertUser(userPrismaRepository, restaurantServiceRepository, userUuidRepository, userBcryptRepository, rolePrismaRepository)
        
        //Name, Email and Restaurant id are missing
        //@ts-ignore
        await expect(insertUser.createEmployee('lastname mock', 74563334, '+345678546789', '123456789')).rejects.toBeInstanceOf(Error)
    })


    test('When some or all parameters are incorrect', async () => {
        const insertUser = new InsertUser(userPrismaRepository, restaurantServiceRepository, userUuidRepository, userBcryptRepository, rolePrismaRepository)
        
        //DNI must be a number and Email validate is incorrect
        //@ts-ignore
        await expect(insertUser.createOwnerOrClient('Client', 'ClientMock', 'lastname mock', "74563334", '+345678546789', 'ownerpruebamocgmail.com', '123456789')).rejects.toBeInstanceOf(Error)
    })


    test('when there is an error in the generation of the user id', async () => {
        const spyCreateUser = jest.spyOn(userPrismaRepository, 'insertUser')
        const spyRestaurantService = jest.spyOn(restaurantServiceRepository, 'addRestaurantEmployee')
        const spyUserId = jest.spyOn(userUuidRepository, 'generateUserId')
        const spyUserPassword = jest.spyOn(userBcryptRepository, 'generateUserPassword')
        const spyRoleUserId = jest.spyOn(rolePrismaRepository, 'getRoleIdByRoleName')

        spyCreateUser.mockResolvedValue({
            userId: BigInt(7075489692244848952),
            userName: "OwnerMock",
            userLastname: "lastname mock",
            userDNI: 74563334,
            userPhoneNumber: "+345678546789",
            userEmail: "ownerpruebamock@gmail.com",
            userPassword: "$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf",
            roleId: "41e37092-13fc-479c-9a1b-576305c5c888"
        })

        //User id generation error
        spyUserId.mockImplementation(() => {
            throw new Error('ERROR IN USER ID')
        })
        spyUserPassword.mockResolvedValue('$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf')
        spyRoleUserId.mockResolvedValue('41e37092-13fc-479c-9a1b-576305c5c888')
        spyRestaurantService.mockResolvedValue('Data is registered')

        const insertUser = new InsertUser(userPrismaRepository, restaurantServiceRepository, userUuidRepository, userBcryptRepository, rolePrismaRepository)

        await expect(insertUser.createOwnerOrClient('Client', 'OwnerMock', 'lastname mock', 74563334, '+345678546789', 'ownerpruebamock@gmail.com', '123456789')).rejects.toBeInstanceOf(Error)
    })


    test('when there is an error in the encryption of the password', async () => {
        const spyCreateUser = jest.spyOn(userPrismaRepository, 'insertUser')
        const spyRestaurantService = jest.spyOn(restaurantServiceRepository, 'addRestaurantEmployee')
        const spyUserId = jest.spyOn(userUuidRepository, 'generateUserId')
        const spyUserPassword = jest.spyOn(userBcryptRepository, 'generateUserPassword')
        const spyRoleUserId = jest.spyOn(rolePrismaRepository, 'getRoleIdByRoleName')

        spyCreateUser.mockResolvedValue({
            userId: BigInt(7075489692244848952),
            userName: "OwnerMock",
            userLastname: "lastname mock",
            userDNI: 74563334,
            userPhoneNumber: "+345678546789",
            userEmail: "ownerpruebamock@gmail.com",
            userPassword: "$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf",
            roleId: "41e37092-13fc-479c-9a1b-576305c5c888"
        })

        spyUserId.mockReturnValue(BigInt(7075489692244848952))
        //Password encryption error
        spyUserPassword.mockRejectedValue(new Error('ERROR IN PASSWORD'))
        spyRoleUserId.mockResolvedValue('41e37092-13fc-479c-9a1b-576305c5c888')
        spyRestaurantService.mockResolvedValue('Data is registered')

        const insertUser = new InsertUser(userPrismaRepository, restaurantServiceRepository, userUuidRepository, userBcryptRepository, rolePrismaRepository)

        await expect(insertUser.createOwnerOrClient('Owner', 'OwnerMock', 'lastname mock', 74563334, '+345678546789', 'ownerpruebamock@gmail.com', '123456789')).rejects.toBeInstanceOf(Error)
    })


    test('when there is the role of the owner does not exist', async () => {
        const spyCreateUser = jest.spyOn(userPrismaRepository, 'insertUser')
        const spyRestaurantService = jest.spyOn(restaurantServiceRepository, 'addRestaurantEmployee')
        const spyUserId = jest.spyOn(userUuidRepository, 'generateUserId')
        const spyUserPassword = jest.spyOn(userBcryptRepository, 'generateUserPassword')
        const spyRoleUserId = jest.spyOn(rolePrismaRepository, 'getRoleIdByRoleName')

        spyCreateUser.mockResolvedValue({
            userId: BigInt(7075489692244848952),
            userName: "OwnerMock",
            userLastname: "lastname mock",
            userDNI: 74563334,
            userPhoneNumber: "+345678546789",
            userEmail: "ownerpruebamock@gmail.com",
            userPassword: "$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf",
            roleId: "41e37092-13fc-479c-9a1b-576305c5c888"
        })

        spyUserId.mockReturnValue(BigInt(7075489692244848952))
        spyUserPassword.mockResolvedValue('$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf')
        //Role of the user does not exist
        spyRoleUserId.mockResolvedValue(null)  
        spyRestaurantService.mockResolvedValue('Data is registered')

        const insertUser = new InsertUser(userPrismaRepository, restaurantServiceRepository, userUuidRepository, userBcryptRepository, rolePrismaRepository)

        await expect(insertUser.createOwnerOrClient('Owner', 'OwnerMock', 'lastname mock', 74563334, '+345678546789', 'ownerpruebamock@gmail.com', '123456789')).rejects.toBeInstanceOf(Error)
    })


    test('when there is the role of the client does not exist', async () => {
        const spyCreateUser = jest.spyOn(userPrismaRepository, 'insertUser')
        const spyRestaurantService = jest.spyOn(restaurantServiceRepository, 'addRestaurantEmployee')
        const spyUserId = jest.spyOn(userUuidRepository, 'generateUserId')
        const spyUserPassword = jest.spyOn(userBcryptRepository, 'generateUserPassword')
        const spyRoleUserId = jest.spyOn(rolePrismaRepository, 'getRoleIdByRoleName')

        spyCreateUser.mockResolvedValue({
            userId: BigInt(7075489692244848952),
            userName: "ClientMock",
            userLastname: "lastname mock",
            userDNI: 74563334,
            userPhoneNumber: "+345678546789",
            userEmail: "clientpruebamock@gmail.com",
            userPassword: "$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf",
            roleId: "41e37092-13fc-479c-9a1b-576305c5c888"
        })

        spyUserId.mockReturnValue(BigInt(7075489692244848952))
        spyUserPassword.mockResolvedValue('$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf')
        //Role of the user does not exist
        spyRoleUserId.mockResolvedValue(null)  
        spyRestaurantService.mockResolvedValue('Data is registered')

        const insertUser = new InsertUser(userPrismaRepository, restaurantServiceRepository, userUuidRepository, userBcryptRepository, rolePrismaRepository)

        await expect(insertUser.createOwnerOrClient('Client', 'ClientMock', 'lastname mock', 74563334, '+345678546789', 'clientpruebamock@gmail.com', '123456789')).rejects.toBeInstanceOf(Error)
    })


    test('When there is an error in obtaining the user role', async () => {
        const spyCreateUser = jest.spyOn(userPrismaRepository, 'insertUser')
        const spyRestaurantService = jest.spyOn(restaurantServiceRepository, 'addRestaurantEmployee')
        const spyUserId = jest.spyOn(userUuidRepository, 'generateUserId')
        const spyUserPassword = jest.spyOn(userBcryptRepository, 'generateUserPassword')
        const spyRoleUserId = jest.spyOn(rolePrismaRepository, 'getRoleIdByRoleName')

        spyCreateUser.mockResolvedValue({
            userId: BigInt(7075489692244848952),
            userName: "OwnerMock",
            userLastname: "lastname mock",
            userDNI: 74563334,
            userPhoneNumber: "+345678546789",
            userEmail: "ownerpruebamock@gmail.com",
            userPassword: "$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf",
            roleId: "41e37092-13fc-479c-9a1b-576305c5c888"
        })

        spyUserId.mockReturnValue(BigInt(7075489692244848952))
        spyUserPassword.mockResolvedValue('$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf')
        //Get role ID error
        spyRoleUserId.mockRejectedValue(new Error('ERROR IN ROLE ID'))  
        spyRestaurantService.mockResolvedValue('Data is registered')

        const insertUser = new InsertUser(userPrismaRepository, restaurantServiceRepository, userUuidRepository, userBcryptRepository, rolePrismaRepository)

        await expect(insertUser.createOwnerOrClient('Client', 'OwnerMock', 'lastname mock', 74563334, '+345678546789', 'ownerpruebamock@gmail.com', '123456789')).rejects.toBeInstanceOf(Error)
    })


    test('When there is an error when saving user data', async () => {
        const spyCreateUser = jest.spyOn(userPrismaRepository, 'insertUser')
        const spyRestaurantService = jest.spyOn(restaurantServiceRepository, 'addRestaurantEmployee')
        const spyUserId = jest.spyOn(userUuidRepository, 'generateUserId')
        const spyUserPassword = jest.spyOn(userBcryptRepository, 'generateUserPassword')
        const spyRoleUserId = jest.spyOn(rolePrismaRepository, 'getRoleIdByRoleName')
        
        //Get role ID error
        spyCreateUser.mockRejectedValue(new Error('ERROR IN SAVE USER'))
        spyUserId.mockReturnValue(BigInt(7075489692244848952))
        spyUserPassword.mockResolvedValue('$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf')
        spyRoleUserId.mockResolvedValue('41e37092-13fc-479c-9a1b-576305c5c888') 
        spyRestaurantService.mockResolvedValue('Data is registered')

        const insertUser = new InsertUser(userPrismaRepository, restaurantServiceRepository, userUuidRepository, userBcryptRepository, rolePrismaRepository)

        await expect(insertUser.createOwnerOrClient('Client', 'OwnerMock', 'lastname mock', 74563334, '+345678546789', 'ownerpruebamock@gmail.com', '123456789')).rejects.toBeInstanceOf(Error)
    })


    test('When there is an error with the restaurant service', async () => {
        const spyCreateUser = jest.spyOn(userPrismaRepository, 'insertUser')
        const spyRestaurantService = jest.spyOn(restaurantServiceRepository, 'addRestaurantEmployee')
        const spyUserId = jest.spyOn(userUuidRepository, 'generateUserId')
        const spyUserPassword = jest.spyOn(userBcryptRepository, 'generateUserPassword')
        const spyRoleUserId = jest.spyOn(rolePrismaRepository, 'getRoleIdByRoleName')
        
        spyCreateUser.mockResolvedValue({
            userId: BigInt(7075489692244848952),
            userName: "OwnerMock",
            userLastname: "lastname mock",
            userDNI: 74563334,
            userPhoneNumber: "+345678546789",
            userEmail: "ownerpruebamock@gmail.com",
            userPassword: "$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf",
            roleId: "41e37092-13fc-479c-9a1b-576305c5c888"
        })

        spyUserId.mockReturnValue(BigInt(7075489692244848952))
        spyUserPassword.mockResolvedValue('$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf')
        spyRoleUserId.mockResolvedValue('41e37092-13fc-479c-9a1b-576305c5c888')
        //RestaurantServiceERROR
        spyRestaurantService.mockRejectedValue(new Error('ERROR IN RESTAURANT SERVICE'))

        const insertUser = new InsertUser(userPrismaRepository, restaurantServiceRepository, userUuidRepository, userBcryptRepository, rolePrismaRepository)

        await expect(insertUser.createEmployee('OwnerMock', 'lastname mock', 74563334, '+345678546789', 'ownerpruebamock@gmail.com', '123456789', 'de891602-ef54-46bc-9356-9e4bf666defc')).rejects.toBeInstanceOf(Error)
    })


    test('when the role of the employee does not exist', async () => {
        const spyCreateUser = jest.spyOn(userPrismaRepository, 'insertUser')
        const spyRestaurantService = jest.spyOn(restaurantServiceRepository, 'addRestaurantEmployee')
        const spyUserId = jest.spyOn(userUuidRepository, 'generateUserId')
        const spyUserPassword = jest.spyOn(userBcryptRepository, 'generateUserPassword')
        const spyRoleUserId = jest.spyOn(rolePrismaRepository, 'getRoleIdByRoleName')

        spyCreateUser.mockResolvedValue({
            userId: BigInt(7075489692244848952),
            userName: "OwnerMock",
            userLastname: "lastname mock",
            userDNI: 74563334,
            userPhoneNumber: "+345678546789",
            userEmail: "ownerpruebamock@gmail.com",
            userPassword: "$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf",
            roleId: "41e37092-13fc-479c-9a1b-576305c5c888"
        })

        spyUserId.mockReturnValue(BigInt(7075489692244848952))
        spyUserPassword.mockResolvedValue('$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUf')
        //Role of the user does not exist
        spyRoleUserId.mockResolvedValue(null)  
        spyRestaurantService.mockResolvedValue('Data is registered')

        const insertUser = new InsertUser(userPrismaRepository, restaurantServiceRepository, userUuidRepository, userBcryptRepository, rolePrismaRepository)

        await expect(insertUser.createEmployee('OwnerMock', 'lastname mock', 74563334, '+345678546789', 'ownerpruebamock@gmail.com', '123456789', 'de891602-ef54-46bc-9356-9e4bf666defc')).rejects.toBeInstanceOf(Error)
    })
})