import swaggerJSDoc, {OAS3Definition, OAS3Options} from "swagger-jsdoc";
import {
tokenForCreateOwner,
tokenForCreateEmployee,
createOwner, 
responseCreateOwner, 
createEmployee, 
responseCreateEmployee,
loginUser,
responseLoginUser,
createClient,
responseCreateClient} from "./users.docs";

import {
getRoleIdByRoleName, 
responseGetRoleByUserId, 
getRoleByUserId, 
getRoleNameByRoleId, 
createRole, 
responseCreateRoles, 
responseGetRoleIdByRoleName} from './role.docs'

const swaggerDefinition: OAS3Definition = {
    openapi: '3.0.0',
    info: {
        title: 'User Microservice - Talent Pool prueba',
        version: '1.0.0',
        description: 'An service that provide CRUD from users and roles'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local server'
        }
    ],
    tags: [
        {
            name: 'Users'
        },
        {
            name: 'Roles'
        }
    ],
    paths: {
        '/api/v1/users/createOwner':{
            post: createOwner
        },
        '/api/v1/users/createEmployee':{
            post: createEmployee
        },
        '/api/v1/users/createClient':{
            post: createClient
        },
        '/api/v1/users/login':{
            post: loginUser
        },
        '/api/v1/roles/{userId}':{
            get: getRoleByUserId
        },
        '/api/v1/roles/id/{roleName}':{
            get: getRoleIdByRoleName
        },
        '/api/v1/roles/name/{roleId}':{
            get: getRoleNameByRoleId
        },
        '/api/v1/roles/insert':{
            post: createRole
        }
    },
    components: {
        securitySchemes: {
            tokenForCreateOwner,
            tokenForCreateEmployee
        },
        schemas:{
            responseCreateOwner,
            responseCreateEmployee,
            responseCreateClient,
            responseLoginUser,
            responseGetRoleByUserId,
            responseGetRoleIdByRoleName,
            responseCreateRoles
        }   
    }
}

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"]
}

export default swaggerJSDoc(swaggerOptions)