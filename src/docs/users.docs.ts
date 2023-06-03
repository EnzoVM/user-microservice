
//EndPoints
const createOwner = {
    tags: ['Users'],
    summary: 'Insert a new owner by admin',
    description: 'This endpoint is for insert a new owner by administrator',
    security: [
        {
            tokenForCreateOwner: []
        }
    ],
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
                        $ref: '#/components/schemas/responseCreateOwner'
                    }
                }
            }
        }
    }
}


const createEmployee = {
    tags: ['Users'],
    summary: 'Insert a new employee by owner',
    description: 'This endpoint is for insert a new employee by owner',
    security: [
        {
            tokenForCreateEmployee: []
        }
    ],
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        userName: {
                            type: 'string',
                            description: 'Name of the new employee',
                            require: true,
                            example: 'Julio'
                        },
                        userLastname: {
                            type: 'string',
                            description: 'Lastname of the new employee',
                            require: true,
                            example: 'Iglesias'
                        },
                        userDNI: {
                            type: 'number',
                            description: 'DNI of the new employee',
                            require: true,
                            example: 73456543
                        },
                        userPhoneNumber: {
                            type: 'string',
                            description: 'PhoneNumber of the new employee',
                            require: true,
                            example: '+745345645645'
                        },
                        userEmail: {
                            type: "string",
                            description: 'Email of the new employee',
                            require: true,
                            example: 'julioiglesias@gmail.com'
                        },
                        userPassword: {
                            type: 'string',
                            description: 'Password of the new employee',
                            require: true,
                            example: 'passwordPrueba'
                        },
                        restaurantId: {
                            type: 'string',
                            description: 'Restaurant id of the new employee',
                            require: true,
                            example: '08f71c12-407f-44fa-a287-8ae32fef9e0b'
                        }
                    }
                }
            }
        }
    },
    responses: {
        '201': {
            description: 'Results for creating a new employee',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/responseCreateEmployee'
                    }
                }
            }
        }
    }
}


const createClient = {
    tags: ['Users'],
    summary: 'Insert a new client',
    description: 'This endpoint is for insert a new client',
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        userName: {
                            type: 'string',
                            description: 'Name of a new client',
                            require: true,
                            example: 'Marcos cliente'
                        },
                        userLastname: {
                            type: 'string',
                            description: 'Lastname of a new client',
                            require: true,
                            example: 'Lopez'
                        },
                        userDNI: {
                            type: 'number',
                            description: 'DNI of a new client',
                            require: true,
                            example: 74346534
                        },
                        userPhoneNumber: {
                            type: 'string',
                            description: 'PhoneNumber of a new client',
                            require: true,
                            example: '+745345682345'
                        },
                        userEmail: {
                            type: "string",
                            description: 'Email of a new client',
                            require: true,
                            example: 'marcoscliente@gmail.com'
                        },
                        userPassword: {
                            type: 'string',
                            description: 'Password of a new client',
                            require: true,
                            example: '12345678'
                        }
                    }
                }
            }
        }
    },
    responses: {
        '201': {
            description: 'Results of create a new client',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/responseCreateClient'
                    }
                }
            }
        }
    }
}


const loginUser = {
    tags: ['Users'],
    summary: 'Login users',
    description: 'This endpoint is for login users',
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        userEmail: {
                            type: 'string',
                            description: 'Email of the user',
                            require: true,
                            example: 'admin@gmail.com'
                        },
                        userPassword: {
                            type: 'string',
                            description: 'Password of the user',
                            require: true,
                            example: '1234567'
                        }
                    }
                }
            }
        }
    },
    responses: {
        '200': {
            description: 'Results for login users',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/responseLoginUser'
                    }
                }
            }
        }
    }
}


//Schemas
const tokenForCreateOwner = {
    type: 'http',
    scheme: 'bearer',
    description: 'Use this admin token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MTYyMjM3NjYzNTU2NDk0NjQ5IiwidXNlclJvbGUiOiJBZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjg0ODAwNTgwfQ.2XyADUiWdkhUySKHMl9VwBKoVNe-usyQqKCxBy51ZX4',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MTYyMjM3NjYzNTU2NDk0NjQ5IiwidXNlclJvbGUiOiJBZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjg0ODAwNTgwfQ.2XyADUiWdkhUySKHMl9VwBKoVNe-usyQqKCxBy51ZX4'
}

const tokenForCreateEmployee = {
    type: 'http',
    scheme: 'bearer',
    description: 'Use this owner token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNjgzNzUxMDEwMzAwNjMxMTIzIiwidXNlclJvbGUiOiJPd25lciIsImlhdCI6MTY4NDgwODM4MH0.lmWBJTH9oet9uh0uBfwl4Fs-xseXDmbQT9Xk7J78jso',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNjgzNzUxMDEwMzAwNjMxMTIzIiwidXNlclJvbGUiOiJPd25lciIsImlhdCI6MTY4NDgwODM4MH0.lmWBJTH9oet9uh0uBfwl4Fs-xseXDmbQT9Xk7J78jso'
}

const responseCreateOwner = {
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
            example: 'The new owner has been inserted successfully'
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

const responseCreateEmployee = {
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
            example: 'The new employee has been inserted successfully'
        },
        data: {
            type: 'object',
            description: 'Data of the response',
            require: true,
            example: {
                userId: "3473458804721858401",
                userName: "EmployeePrueba",
                userLastname: "employee",
                userDNI: 74563334,
                userPhoneNumber: "+345678546789",
                userEmail: "employee@gmail.com",
                userPassword: "$2b$10$hhpEWiSsQu3XQHyhoxLAo.uaIMRqtZGL9uTMYFB2qru4mMywARYdK",
                roleId: "8f323445-48ea-4067-8a13-e8fa1f746e95"
            }
        }
    }
}

const responseCreateClient = {
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
            example: 'The new client has been inserted successfully'
        },
        data: {
            type: 'object',
            description: 'Data of the response',
            require: true,
            example: {
                userId: "7076672780413187379",
                userName: "Cliente prueba",
                userLastname: "apellido cliente",
                userDNI: 74563334,
                userPhoneNumber: "+345678546789",
                userEmail: "cliente@gmail.com",
                userPassword: "$2b$10$MrmpYRHuMe1vfrxW9yAELe8.LqYIXUuq048DVbkVgoQKtdOqhFj4i",
                roleId: "03278f3a-df09-4c37-b4d0-e875a5809a47"
            }
        }
    }
}

const responseLoginUser = {
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
            example: 'The user has successfully logged in'
        },
        data: {
            type: 'string',
            description: 'Data of the response',
            require: true,
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MTYyMjM3NjYzNTU2NDk0NjQ5IiwidXNlclJvbGUiOiJBZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjg0ODEzOTQ0fQ.38dtD5INvif9VuRSBpe9gEQlCbX42wojbHnXaBee8Ic'
        }
    }
}



export {tokenForCreateOwner,tokenForCreateEmployee, createOwner, responseCreateOwner, createEmployee, responseCreateEmployee, loginUser, responseLoginUser, createClient, responseCreateClient}