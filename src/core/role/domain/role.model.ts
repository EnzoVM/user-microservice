import {v4 as uuid} from 'uuid'

export default class Role {
    roleId: string
    roleName: string
    roleDescription: string

    constructor(roleName: string, roleDescription: string){
        this.roleId= uuid(),
        this.roleName = roleName,
        this.roleDescription= roleDescription
    }
}