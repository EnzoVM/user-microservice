
export default class Role {
    roleId: string
    roleName: string
    roleDescription: string

    constructor({roleId, roleName, roleDescription}:{roleId: string, roleName: string, roleDescription: string}){
        this.roleId= roleId
        this.roleName = roleName
        this.roleDescription= roleDescription
    }
}