import axios from 'axios'
import UserServiceRepository from '../../domain/user.service.repository'

export default class RestaurantServiceRepository implements UserServiceRepository {
    
    async addRestaurantEmployee (restaurantId: string, chefId: string) {
        try {
            const response = await axios.post(`${process.env.API_INSERT_EMPLOYEE_RESTAURANT}`, {
                restaurantId,
                chefId
            })
            
            return response.data.message
    
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}
