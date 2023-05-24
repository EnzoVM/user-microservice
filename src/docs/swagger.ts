import swaggerJSDoc, {OAS3Definition, OAS3Options} from "swagger-jsdoc";
import {
tokenForCreateOwner,
tokenForCreateEmployee,
createOwner, 
responseCreateOwner, 
createEmployee, 
responseCreateEmployee,
loginUser,
responseLoginUser} from "./users.docs";

const swaggerDefinition: OAS3Definition = {
    openapi: '3.0.0',
    info: {
        title: 'User Microservice - Talent Pool',
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
        '/api/v1/users/login':{
            post: loginUser
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
            responseLoginUser
        }   
    }
}

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"]
}

export default swaggerJSDoc(swaggerOptions)