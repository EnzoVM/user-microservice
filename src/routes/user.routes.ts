import { Router } from "express"
import { getRoleUserById ,createNewRestaurantOwner, login, createNewRestaurantEmployee } from "../controllers/user.controller"
import { verifyUserRole } from "../middlewares/verify.user.role";

const userRoutes = Router()

userRoutes
    .get('/getRoleId/:userId', getRoleUserById)
    .post('/createOwner', verifyUserRole('Administrator') ,createNewRestaurantOwner)
    .post('/createEmployee', verifyUserRole('Owner'), createNewRestaurantEmployee)
    .post('/login', login)

export default userRoutes