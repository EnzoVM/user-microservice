import {
IsEmail, 
IsNumber, 
IsString, 
IsNumberString, 
MaxLength, 
Matches,
IsNotEmpty} from 'class-validator'

export default class UserDTO {

    @IsNotEmpty({message: 'Name of user is empty', groups:['OwnerAndClientValidation']})
    @IsString({message: 'Name must be a string', groups:['OwnerAndClientValidation']})
    userName: string
    
    @IsNotEmpty({message: 'Lastname of user is empty', groups:['OwnerAndClientValidation']})
    @IsString({message: 'Lastname must be a string', groups:['OwnerAndClientValidation']})
    userLastname: string

    @IsNotEmpty({message: 'DNI of user is empty', groups:['OwnerAndClientValidation']})
    @IsNumber({}, {message: 'DNI must be a number', groups:['OwnerAndClientValidation']})
    userDNI: number

    @IsNotEmpty({message: 'Phone number of user is empty', groups:['OwnerAndClientValidation']})
    @IsNumberString({}, {message: 'Phone number must be a number', groups:['OwnerAndClientValidation']})
    @MaxLength(13, {message: 'Phone number is very long, only 13 characters allowed', groups:['OwnerAndClientValidation']})
    @Matches(/^(\+)?\d+$/, {message: 'Phone number must be numeric and may include the leading + symbol', groups:['OwnerAndClientValidation']})
    userPhoneNumber: string

    @IsNotEmpty({message: 'Email of user is empty', groups:['OwnerAndClientValidation']})
    @IsString({message: 'Email must be a string', groups:['OwnerAndClientValidation']})
    @IsEmail({},{message: 'Email entered is not valid', groups:['OwnerAndClientValidation']})
    @IsNotEmpty({message: 'Email of user is empty', groups:['loginValidation']})
    @IsString({message: 'Email must be a string', groups:['loginValidation']})
    @IsEmail({},{message: 'Email entered is not valid', groups:['loginValidation']})
    userEmail: string

    @IsNotEmpty({message: 'Password of user is empty', groups:['OwnerAndClientValidation']})
    @IsString({message: 'Password must be a string', groups:['OwnerAndClientValidation']})
    @IsNotEmpty({message: 'Password of user is empty', groups:['loginValidation']})
    @IsString({message: 'Password must be a string', groups:['loginValidation']})
    userPassword: string

    @IsNotEmpty({message: 'Restaurant id of employee is empty'})
    @IsString({message: 'Restaurant id must be a string'})
    restaurantId: string

    constructor({userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword, restaurantId}:{userName: string, userLastname: string, userDNI: number, userPhoneNumber: string, userEmail: string, userPassword: string, restaurantId: string}){
        this.userName = userName,
        this.userLastname = userLastname,
        this.userDNI = userDNI,
        this.userPhoneNumber = userPhoneNumber,
        this.userEmail = userEmail,
        this.userPassword = userPassword,
        this.restaurantId = restaurantId
    }
}