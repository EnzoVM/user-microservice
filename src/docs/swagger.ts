import swaggerJSDoc, {OAS3Definition, OAS3Options} from "swagger-jsdoc";
import { createRestaurantOwner, responseCreateRestaurantOwner } from "./users.docs";

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
        '/api/v1/user/createOwner':{
            post: createRestaurantOwner
        }
    },
    components: {
        schemas:{
            responseCreateRestaurantOwner
        }   
    }
}

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"]
}

export default swaggerJSDoc(swaggerOptions)