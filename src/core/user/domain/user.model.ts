import {v4 as uuid} from 'uuid'
import IUser from './user.interface'

export default class User implements IUser{
    userId: BigInt
    userName: String
    userLastname: String
    userDNI: String
    userPhoneNumber: Number
    userEmail: String
    userPassword: String
    roleId: BigInt

    constructor(userName: String, userLastname: String, userDNI: String, userPhoneNumber: Number, userEmail: String, userPassword: String, roleId: BigInt){
        this.userId = BigInt(uuid()),
        this.userName = userName,
        this.userLastname = userLastname,
        this.userDNI = userDNI,
        this.userPhoneNumber = userPhoneNumber,
        this.userEmail = userEmail,
        this.userPassword = userPassword
        this.roleId = roleId
    }
}