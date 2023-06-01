
export default class User{
    userId: bigint
    userName: string
    userLastname: string
    userDNI: number
    userPhoneNumber: string
    userEmail: string
    userPassword: string
    roleId: string
    
    constructor({userId, userName, userLastname, userDNI, userPhoneNumber, userEmail, userPassword, roleId}:{userId: bigint, userName: string, userLastname: string, userDNI: number, userPhoneNumber: string, userEmail: string, userPassword: string, roleId: string}){
        this.userId = userId,
        this.userName = userName,
        this.userLastname = userLastname,
        this.userDNI = userDNI,
        this.userPhoneNumber = userPhoneNumber,
        this.userEmail = userEmail,
        this.userPassword = userPassword,
        this.roleId = roleId
    }
}