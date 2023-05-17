import { Router } from "express"
import { getIdByName, createNewRole } from "../controllers/role.controller"

const roleRoutes = Router()

roleRoutes
    .get('/id/:roleName', getIdByName)
    .post('/insert', createNewRole)


export default roleRoutes