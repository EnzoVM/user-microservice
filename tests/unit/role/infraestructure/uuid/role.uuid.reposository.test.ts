import RoleUuidRepository from '../../../../../src/core/role/infraestructure/uuid/role.uuid.repository'
import {v4 as uuidv4} from 'uuid'

jest.mock("uuid")

describe('Generate role Id', () => {

    test('Generate role id successfully', () => {
        (uuidv4 as jest.Mock).mockReturnValueOnce('efffef55665g5-6y5y665g-5gretrrgrg')

        const roleUuidRepository = new RoleUuidRepository()
        const generateRoleId = roleUuidRepository.generateRoleId()
        
        expect(generateRoleId).toStrictEqual('efffef55665g5-6y5y665g-5gretrrgrg')
    })
})