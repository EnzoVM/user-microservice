import Role from "../../../../src/core/role/domain/role.model"
import RoleUuidRepository from "../../../../src/core/role/infraestructure/uuid/role.uuid.repository"

const roleId: jest.Mocked<RoleUuidRepository> = {
    generateRoleId: jest.fn(() => 'f4f4rfrfr5g5grg-5g3dh6j6j6j-f4f3devrvbtb')
}

describe('Role Model', () => {

    test('Should create a new object role', () => {

        const newRole = new Role({
            roleId: roleId.generateRoleId(),
            roleName: 'Role user mock',
            roleDescription: 'Description of new role mock'
        })

        expect(newRole.roleId).toStrictEqual('f4f4rfrfr5g5grg-5g3dh6j6j6j-f4f3devrvbtb')
        expect(newRole.roleName).toStrictEqual('Role user mock')
    })
})