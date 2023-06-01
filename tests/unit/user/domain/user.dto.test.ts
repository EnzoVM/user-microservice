import UserDTO from "../../../../src/core/user/domain/user.dto"
import { ValidationError, validate } from "class-validator"
import { userDtoDataMissing, userDtoDataValidate } from "../../../helpers/user.dto.helper"

describe('UserDTO model', () => {
    
    test('Data entered is correct', async () => {

        const errorDataUser = await validate(new UserDTO({
            userName: 'Juan', 
            userLastname: 'Perez', 
            userDNI: 74563456, 
            userPhoneNumber: "+345678546789", 
            userEmail: "juanperez@gmail.com", 
            userPassword: "123456789",
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc"
        }))

        expect(errorDataUser).toEqual([])
    })


    test('When some or all parameters are missing', async () => {

        for(const data of userDtoDataMissing){
            //@ts-ignore
            const errorDataUser = await validate(new UserDTO(data))

            expect(errorDataUser[0]).toBeInstanceOf(ValidationError)
        }   
    })

    
    test('When email/phone number/DNI are wrong', async () => {

        for(const data of userDtoDataValidate){
            //@ts-ignore
            const errorDataUser = await validate(new UserDTO(data))

            expect(errorDataUser[0]).toBeInstanceOf(ValidationError)
        }   
    })
})
