import axios from 'axios'
import UserServiceRepository from '../../domain/user.service.repository'

const serviceUrl = 'http://localhost:3001'

export default class RestaurantServiceRepository implements UserServiceRepository {
    
    async addRestaurantEmployee (restaurantId: string, chefId: string) {
        try {
            const response = await axios.post(`${serviceUrl}/api/v1/restaurantemployee/create`, {
                restaurantId,
                chefId
            })
    
            const {status, message, data} = response.data
    
            return message
    
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}
    