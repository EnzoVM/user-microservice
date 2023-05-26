

export default interface UserServiceRepository {

    addRestaurantEmployee: (restaurantId: string, chefId: string) => Promise<string>
    
}