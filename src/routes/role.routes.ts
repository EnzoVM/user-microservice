import { Router } from "express"
import { getRoleById ,getIdByName, createNewRole } from "../controllers/role.controller"

const roleRoutes = Router()

roleRoutes
    .get('/id/:roleName', getIdByName)
    .get('/name/:roleId', getRoleById)
    .post('/insert', createNewRole)

export default roleRoutes