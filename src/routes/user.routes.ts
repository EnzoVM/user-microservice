import { Router } from "express"
import { getRoleById ,createNewOwner, login, createNewEmployee, createNewClient } from "../controllers/user.controller"
import { verifyUserRole } from "../middlewares/verify.user.role";

const userRoutes = Router()

userRoutes
    .get('/getRoleId/:userId', getRoleById)
    .post('/createOwner', verifyUserRole('Administrator'), createNewOwner)
    .post('/createEmployee', verifyUserRole('Owner'), createNewEmployee)
    .post('/createClient', createNewClient)
    .post('/login', login)

export default userRoutes