import RoleDTO from "../../../../src/core/role/domain/role.dto"
import { ValidationError, validate } from 'class-validator'

describe('Role DTO', () => {

    test('Data is entered is correct', async () => {

        const errorDataRole = await validate(new RoleDTO({
            roleName: 'Nuevo role',
            roleDescription: 'Description of the new role'
        }))

        expect(errorDataRole).toEqual([])
    })


    test('When role name is missing', async () => {

        //@ts-ignore
        const errorDataRole = await validate(new RoleDTO({
            roleDescription: 'Description of the new role'
        }))

        expect(errorDataRole[0]).toBeInstanceOf(ValidationError)
    })


    test('When role description is missing', async () => {

        //@ts-ignore
        const errorDataRole = await validate(new RoleDTO({
            roleName: 'Nuevo role'
        }))

        expect(errorDataRole[0]).toBeInstanceOf(ValidationError)
    })


    test('When role name is a number', async () => {

        const errorDataRole = await validate(new RoleDTO({
            //@ts-ignore
            roleName: 20,
            roleDescription: 'Description of the new role'
        }))

        expect(errorDataRole[0]).toBeInstanceOf(ValidationError)
    })


    test('When role description is a number', async () => {

        const errorDataRole = await validate(new RoleDTO({
            roleName: 'Nuevo role',
            //@ts-ignore
            roleDescription: 40
        }))

        expect(errorDataRole[0]).toBeInstanceOf(ValidationError)
    })
})