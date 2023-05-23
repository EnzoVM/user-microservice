import axios from 'axios'

const serviceUrl = 'http://localhost:3001'

export const addRestaurantEmployee = async (restaurantId: string, chefId: string) => {
    try {
        const response = await axios.post(`${serviceUrl}/api/v1/restaurants/createRestaurantEmployee`, {
            restaurantId,
            chefId
        })

        const {status, message, data} = response.data

        return {status, message, data}

    } catch (error:any) {
        
        return {status: 'Fail', message: error.message}

    }
}