import { Router } from "express"
import { getRoleUserById ,createNewRestaurantOwner } from "../controllers/user.controller"

const userRoutes = Router()

userRoutes.get('/getRoleId/:userId', getRoleUserById)
userRoutes.post('/createOwner', createNewRestaurantOwner)

export default userRoutes