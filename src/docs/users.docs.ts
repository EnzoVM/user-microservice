

//EndPoints

const createRestaurantOwner = {
    tags: ['Users'],
    summary: 'Insert a new owner by admin',
    description: 'This endpoint is for insert a new restaurant owner by administrator',
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        userName: {
                            type: 'string',
                            description: 'Name of the new restaurant owner',
                            require: true,
                            example: 'Mario'
                        },
                        userLastname: {
                            type: 'string',
                            description: 'Lastname of the new restaurant owner',
                            require: true,
                            example: 'Casas'
                        },
                        userDNI: {
                            type: 'number',
                            description: 'DNI of the new restaurant owner',
                            require: true,
                            example: 74536783
                        },
                        userPhoneNumber: {
                            type: 'string',
                            description: 'PhoneNumber of the new restaurant owner',
                            require: true,
                            example: '+745345682345'
                        },
                        userEmail: {
                            type: "string",
                            description: 'Email of the new restaurant owner',
                            require: true,
                            example: 'mariocasas@gmail.com'
                        },
                        userPassword: {
                            type: 'string',
                            description: 'Password of the new restaurant owner',
                            require: true,
                            example: 'PasswordPrueba'
                        }
                    }
                }
            }
        }
    },
    responses: {
        '201': {
            description: 'Results for creating a new restaurant owner',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/responseCreateRestaurantOwner'
                    }
                }
            }
        }
    }
}


//Schemas of responses

const responseCreateRestaurantOwner = {
    type: 'object',
    properties: {
        status: {
            type: 'string',
            description: 'State code of the response',
            require: true,
            example: 'OK'
        },
        message: {
            type: 'string',
            description: 'Message of the response',
            require: true,
            example: 'The new restaurant owner has been inserted successfully'
        },
        data: {
            type: 'object',
            description: 'Data of the response',
            require: true,
            example: {
                userId: '7076060343027459122',
                userName: 'Marlon',
                userLastname: 'Casanova', 
                userDNI: 74536434,
                userPhoneNumber: '+745344562345', 
                userEmail: 'marloncasas@gmail.com',
                userPassword: 'PasswordPrueba',
                roleId: '41e37092-13fc-479c-9a1b-576305c5c888',
            }
        }
    }
}



export {createRestaurantOwner, responseCreateRestaurantOwner}