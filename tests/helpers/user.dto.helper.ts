
export const userDtoDataMissing = [
    {

    },
    {
        //userName: 'Juan', 
        userLastname: 'Perez', 
        userDNI: 74563456, 
        userPhoneNumber: "+345678546789", 
        userEmail: "juanperez@gmail.com", 
        userPassword: "123456789",
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc"
    },
    {
        userName: 'Juan', 
        //userLastname: 'Perez', 
        userDNI: 74563456, 
        userPhoneNumber: "+345678546789", 
        userEmail: "juanperez@gmail.com", 
        userPassword: "123456789",
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc"
    },
    {
        userName: 'Juan', 
        userLastname: 'Perez', 
        //userDNI: 74563456, 
        userPhoneNumber: "+345678546789", 
        userEmail: "juanperez@gmail.com", 
        userPassword: "123456789",
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc"
    },
    {
        userName: 'Juan', 
        userLastname: 'Perez', 
        userDNI: 74563456, 
        //userPhoneNumber: "+345678546789", 
        userEmail: "juanperez@gmail.com", 
        userPassword: "123456789",
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc"
    },
    {
        userName: 'Juan', 
        userLastname: 'Perez', 
        userDNI: 74563456, 
        userPhoneNumber: "+345678546789", 
        //userEmail: "juanperez@gmail.com", 
        userPassword: "123456789",
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc"
    },
    {
        userName: 'Juan', 
        userLastname: 'Perez', 
        userDNI: 74563456, 
        userPhoneNumber: "+345678546789", 
        userEmail: "juanperez@gmail.com", 
        //userPassword: "123456789"
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc"
    },
    {
        userName: 'Juan', 
        userLastname: 'Perez', 
        userDNI: 74563456, 
        userPhoneNumber: "+345678546789", 
        userEmail: "juanperez@gmail.com", 
        userPassword: "123456789"
        //restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc"
    }
]


export const userDtoDataValidate = [
    {
        userName: 'Juan', 
        userLastname: 'Perez', 
        userDNI: 74563456, 
        userPhoneNumber: "+345678546789", 
        userEmail: "juanperezgmail.com",  //Wrong email structure
        userPassword: "123456789",
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc"
    },
    {
        userName: 'Juan', 
        userLastname: 'Perez', 
        userDNI: "74563456",  //DNI must be a number
        userPhoneNumber: "+345678546789", 
        userEmail: "juanperez@gmail.com", 
        userPassword: "123456789",
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc"
    },
    {
        userName: 'Juan', 
        userLastname: 'Perez', 
        userDNI: 74563456, 
        userPhoneNumber: "+34567854678945", //Phone number with more than 13 characters
        userEmail: "juanperez@gmail.com", 
        userPassword: "123456789",
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc"
    }
]