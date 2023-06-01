import UserUuidRepository from '../../../../../src/core/user/infraestructure/uuid/user.uuid.repository'
import {v4 as uuidv4} from 'uuid'

jest.mock("uuid")

describe('Generate user Id', () => {

    test('Generate Id successfully', () => {
        (uuidv4 as jest.Mock).mockReturnValueOnce('efffef55665g5-6y5y665g-5g')

        const userUuidRepository = new UserUuidRepository()
        const generateId = userUuidRepository.generateUserId()
        
        expect(generateId).toBe(BigInt.asUintN(64, BigInt(`0x${Buffer.from('efffef55665g5-6y5y665g-5g').toString('hex')}`)))
    })
})