import { Router } from "express"
import { getRoleNameById ,getRoleIdByName, createNewRole, getRoleByUserId } from "../controllers/role.controller"

const roleRoutes = Router()

roleRoutes
    .get('/:userId', getRoleByUserId)
    .get('/id/:roleName', getRoleIdByName)
    .get('/name/:roleId', getRoleNameById)
    .post('/insert', createNewRole)

export default roleRoutes