import {
IsString,
IsNotEmpty} from 'class-validator'

export default class RoleDTO {
    
    @IsNotEmpty({message: 'Name of role is empty'})
    @IsString({message: 'Name of role must be a string'})
    roleName: string
    
    @IsNotEmpty({message: 'Description of role is empty'})
    @IsString({message: 'Description of role must be a string'})
    roleDescription: string

    constructor({roleName, roleDescription}:{roleName: string, roleDescription: string}){
        this.roleName = roleName,
        this.roleDescription = roleDescription
    }
}