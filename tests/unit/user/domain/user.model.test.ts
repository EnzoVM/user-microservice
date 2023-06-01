import User from "../../../../src/core/user/domain/user.model"
import UserUuidRepository from "../../../../src/core/user/infraestructure/uuid/user.uuid.repository"
import UserBcryptRepository from "../../../../src/core/user/infraestructure/bcrypt/user.bcrypt.repository"

const userId: jest.Mocked<UserUuidRepository> = {
    generateUserId: jest.fn(() => BigInt(843434535353232302434))
}

jest.mock("../../../../src/core/user/infraestructure/bcrypt/user.bcrypt.repository")

describe('User Model', () => {
    
    test('Should create a new Object User', async () => {
        const userBcryptRepository = new UserBcryptRepository()
        const spy = jest.spyOn(userBcryptRepository, 'generateUserPassword')
        spy.mockResolvedValue("$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUfqhUS")

        const newUser = new User({
            userId: userId.generateUserId(),
            userName: "OwnerPrueba1234",
            userLastname:"owener",
            userDNI: 74563334,
            userPhoneNumber: "+345678546789",
            userEmail:  "ownerprueba@gmail.com",
            userPassword: await userBcryptRepository.generateUserPassword("123456789"),
            roleId: "41e37092-13fc-479c-9a1b-576305c5c888"
        })

        expect(newUser.userId).toBe(BigInt(843434535353232302434))
        expect(newUser.userPassword).toStrictEqual('$2b$10$e.v9.NcUYzV7fcXDv79ZPemgaUfqhUS')
    })
})