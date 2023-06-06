import axios from 'axios'
import UserServiceRepository from '../../domain/user.service.repository'

const serviceUrl = process.env.NODE_ENV === 'dev' ?  'http://192.168.18.116:3001' : process.env.API_PLAZOLETA

export default class RestaurantServiceRepository implements UserServiceRepository {
    
    async addRestaurantEmployee (restaurantId: string, chefId: string) {
        try {
            const response = await axios.post(`${serviceUrl}/api/v1/restaurantemployee/create`, {
                restaurantId,
                chefId
            })
            
            return response.data.message
    
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}
