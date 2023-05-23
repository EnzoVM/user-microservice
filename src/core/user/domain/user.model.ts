import {v4 as uuidv4} from 'uuid'
import bcrypt from 'bcrypt'

export default class User{
    userId: bigint
    userName: string
    userLastname: string
    userDNI: number
    userPhoneNumber: string
    userEmail: string
    userPassword: string
    roleId: string
    
    constructor(userName: string, userLastname: string, userDNI: number, userPhoneNumber: string, userEmail: string, userPassword: string, roleId: string){
        this.userId = BigInt.asUintN(64, BigInt(`0x${Buffer.from(uuidv4()).toString('hex')}`)),
        this.userName = userName,
        this.userLastname = userLastname,
        this.userDNI = userDNI,
        this.userPhoneNumber = userPhoneNumber,
        this.userEmail = userEmail,
        this.userPassword = bcrypt.hashSync(userPassword, 10)
        this.roleId = roleId
    }
}