import {
IsEmail, 
IsNumber, 
IsString, 
IsNumberString, 
MaxLength, 
Matches} from 'class-validator'

export default class UserDTO {

    @IsString()
    userName: string
    
    @IsString()
    userLastname: string

    @IsNumber()
    userDNI: number

    @IsNumberString({}, {message: 'El valor ingresado debe de ser un numero'})
    @MaxLength(13, {message: 'El número ingresado es muy largo, solo se permite 13 caracteres'})
    @Matches(/^(\+)?\d+$/, {message: 'El valor debe de ser númerico y puede incluir el símbolo "+" al inicio'})
    userPhoneNumber: string

    @IsEmail({},{message: 'El email ingresado no es valido'})
    userEmail: string

    @IsString()
    userPassword: string

    constructor(userName: string, userLastname: string, userDNI: number, userPhoneNumber: string, userEmail: string, userPassword: string){
        this.userName = userName,
        this.userLastname = userLastname,
        this.userDNI = userDNI,
        this.userPhoneNumber = userPhoneNumber,
        this.userEmail = userEmail,
        this.userPassword = userPassword
    }
}