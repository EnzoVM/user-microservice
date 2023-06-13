import axios from 'axios'
import UserServiceRepository from '../../domain/user.service.repository'

const serviceUrl = process.env.NODE_ENV === 'dev' ?  'http://192.168.18.116:3001/api/v1/restaurantemployee/create' : process.env.API_INSERT_EMPLOYEE_RESTAURANT

export default class RestaurantServiceRepository implements UserServiceRepository {
    
    async addRestaurantEmployee (restaurantId: string, chefId: string) {
        try {
            const response = await axios.post(`${serviceUrl}`, {
                restaurantId,
                chefId
            })
            
            return response.data.message
    
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}
