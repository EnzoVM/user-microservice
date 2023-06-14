import { Router } from "express"
import { login, createNewEmployee, createNewOwnerOrClient } from "../controllers/user.controller"
import { verifyUserRole } from "../middlewares/verify.user.role";

const userRoutes = Router()

userRoutes
    .post('/createOwner', verifyUserRole('Administrator'), createNewOwnerOrClient('Owner'))
    .post('/createEmployee', verifyUserRole('Owner'), createNewEmployee)
    .post('/createClient', createNewOwnerOrClient('Client'))
    .post('/login', login)

export default userRoutes