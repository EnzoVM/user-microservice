import axios from 'axios'
import UserServiceRepository from '../../domain/user.service.repository'

const serviceUrl = 'http://localhost:3001'

export default class RestaurantServiceRepository implements UserServiceRepository {
    
    async addRestaurantEmployee (restaurantId: string, chefId: string) {
        try {
            const response = await axios.post(`${serviceUrl}/api/v1/restaurants/createEmployeeRestaurant`, {
                restaurantId,
                chefId
            })
    
            const {status, message, data} = response.data
    
            return message
    
        } catch (error:any) {
            
            return {status: 'Fail', message: 'ERROR EMPLOYEE TO RESTAURANT'}
    
        }
    }
}
    