import { Router } from "express"
import { addNewOwnerRestaurant } from "../controllers/user.controller"

const userRoutes = Router()

userRoutes.post('/createOwner', addNewOwnerRestaurant)


export default userRoutes