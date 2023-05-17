import { Router } from "express"
import { createNewRestaurantOwner } from "../controllers/user.controller"

const userRoutes = Router()


userRoutes.post('/createOwner', createNewRestaurantOwner)


export default userRoutes