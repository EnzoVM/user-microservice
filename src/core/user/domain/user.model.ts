import {v4 as uuid} from 'uuid'
import IUser from './user.interface'
import BN from 'bn.js'

export default class User implements IUser{
    userId: bigint
    userName: string
    userLastname: string
    userDNI: string
    userPhoneNumber: number
    userEmail: string
    userPassword: string
    roleId: string
    
    constructor(userName: string, userLastname: string, userDNI: string, userPhoneNumber: number, userEmail: string, userPassword: string, roleId: string){
        this.userId = BigInt(new BN(require('crypto').randomBytes(8)).toString()),
        this.userName = userName,
        this.userLastname = userLastname,
        this.userDNI = userDNI,
        this.userPhoneNumber = userPhoneNumber,
        this.userEmail = userEmail,
        this.userPassword = userPassword
        this.roleId = roleId
    }
}