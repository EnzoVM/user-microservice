import RestaurantServiceRepository from "../../../../../src/core/user/infraestructure/services/restaurant.service.repository"
import axios from 'axios'

jest.mock("axios")

describe('Restaurant Service / add restaurant employee', () => {

    let restaurantServiceRepository

    beforeEach(() => {
        restaurantServiceRepository = new RestaurantServiceRepository()
    })
    
    afterEach(() => {
        jest.restoreAllMocks()
    })

    
    test('Should insert an employee into a restaurant', async () => {
        (axios as jest.Mocked<typeof axios>).post.mockResolvedValue({
            data: {
                status: 'OK',
                message: 'Data is registered mock',
                data: {
                    restaurantEmployeeId: 'dd2a71b65-df82',
                    restaurantId: '08f71c12-407f-44fa',
                    chefId: '7004894246724579938'
                }
            }
        })

        const response = await restaurantServiceRepository.addRestaurantEmployee('08f71c12-407f-44fa', '7004894246724579938')

        expect((axios as jest.Mocked<typeof axios>).post).toHaveBeenCalled()
        expect(response).toStrictEqual('Data is registered mock')
    })


    test('When there is an error with axios', async () => {
        (axios as jest.Mocked<typeof axios>).post.mockRejectedValue(new Error('ERROR IN ADD EMPLOYEE INTO RESTAURANT'))

        await expect(restaurantServiceRepository.addRestaurantEmployee('08f71c12-407f-44fa', '7004894246724579938')).rejects.toBeInstanceOf(Error)
    })
})