//Parameters
const userId = {
    name: 'userId',
    in: 'path',
    required: true,
    schema: {
      type: 'string'
    },
    description: 'This is id of a dish',
    example: '268651286694032793'
}

const roleName = {
    name: 'roleName',
    in: 'path',
    required: true,
    schema: {
      type: 'string'
    },
    description: 'This is id of a dish',
    example: 'Owner'
}


const roleId = {
    name: 'roleId',
    in: 'path',
    required: true,
    schema: {
      type: 'string'
    },
    description: 'This is id of a dish',
    example: '8f323445-48ea-4067-8a13-e8fa1f746e95'
}

//Endpoints
const getRoleByUserId = {
    tags: ['Roles'],
    summary: 'Get a role name by user id',
    description: 'This endpoint is for get a role name by user id',
    parameters : [
        userId
    ],
    responses: {
        '200': {
            description: 'Get role id by user id',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/responseGetRoleByUserId'
                    }
                }
            }
        }
    }
}


const getRoleIdByRoleName = {
    tags: ['Roles'],
    summary: 'Get a role id by role name',
    description: 'This endpoint is for get a role id by role name',
    parameters : [
        roleName
    ],
    responses: {
        '200': {
            description: 'Get role id by user id',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/responseGetRoleIdByRoleName'
                    }
                }
            }
        }
    }
}


const getRoleNameByRoleId = {
    tags: ['Roles'],
    summary: 'Get a role name by role id',
    description: 'This endpoint is for get a role name by role id',
    parameters : [
        roleId
    ],
    responses: {
        '200': {
            description: 'Get role id by user id',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/responseGetRoleByUserId'
                    }
                }
            }
        }
    }
}


const createRole = {
    tags: ['Roles'],
    summary: 'Insert a new role',
    description: 'This endpoint is for insert a new role',
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        roleName: {
                            type: 'string',
                            description: 'Name of the new role',
                            require: true,
                            example: 'Nuevo Role Prueba'
                        },
                        roleDescription: {
                            type: 'string',
                            description: 'Description of the new role',
                            require: true,
                            example: 'Esta es una descripcion de prueba'
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
                        $ref: '#/components/schemas/responseCreateRoles'
                    }
                }
            }
        }
    }
}


//Schemas
const responseGetRoleByUserId = {
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
            example: 'The role name has been found'
        },
        data: {
            type: 'string',
            description: 'Data of the response',
            require: true,
            example: 'Employee'
        }
    }
}



const responseGetRoleIdByRoleName = {
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
            example: 'The role id has been found'
        },
        data: {
            type: 'string',
            description: 'Data of the response',
            require: true,
            example: '03278f3a-df09-4c37-b4d0-e875a5809a47'
        }
    }
}


const responseCreateRoles = {
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
            example: 'The new role has been inserted successfully'
        },
        data: {
            type: 'object',
            description: 'Data of the response',
            require: true,
            example: {
                roleId: "03278f3a-dff4f4f09-4c37-b4r44f4fd0-e875a5809a",
                roleName: "Rol de ejemplo",
                roleDescription: "Este es un rol de ejemplo",
            }
        }
    }
}


export {getRoleIdByRoleName, responseGetRoleByUserId, getRoleByUserId, getRoleNameByRoleId, createRole, responseCreateRoles, responseGetRoleIdByRoleName}