import UserBcryptRepository from '../../../../../src/core/user/infraestructure/bcrypt/user.bcrypt.repository'
import bcrypt from 'bcrypt'

jest.mock("bcrypt")

describe('Encrypt and Decrypt password', () => {

    test('Encrypt the password', async () => {
        bcrypt.hash = jest.fn().mockResolvedValue('$2b$10$e.v9.NcUYzV7fcXDv7')
        
        const userBcryptRepository = new UserBcryptRepository()
        const passwordEncrypted = await userBcryptRepository.generateUserPassword('password1234')

        expect(passwordEncrypted).toBe('$2b$10$e.v9.NcUYzV7fcXDv7')
    })

    test('When there is an error with bcrypt', async () => {
        bcrypt.hash = jest.fn().mockRejectedValue(new Error('ERROR IN BCRYPT'))
        
        const userBcryptRepository = new UserBcryptRepository()

        await expect(userBcryptRepository.generateUserPassword('password1234')).rejects.toBeInstanceOf(Error)
    })


    test('When a numeric password is entered', async () => {
        const userBcryptRepository = new UserBcryptRepository()
        
        //@ts-ignore
        await expect(userBcryptRepository.generateUserPassword(1111)).rejects.toBeInstanceOf(Error)
    })

    test('Decrypt the password', async () => {
        bcrypt.compare = jest.fn().mockResolvedValue(true)
        
        const userBcryptRepository = new UserBcryptRepository()
        const passwordDecrypted = await userBcryptRepository.decryptUserPassword('password1234', '$2b$10$e.v9.NcUYzV7fcXDv7')

        expect(passwordDecrypted).toBe(true)
    })
})