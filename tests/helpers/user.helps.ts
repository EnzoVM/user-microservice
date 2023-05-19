
//Array for data testing
export const dataUserMissing = [
    {
        //All the data is missing
    },
    {
        //The userName is missing
        userLastname:"Gonzales",
        userDNI: 74563334,
        userPhoneNumber: "+345678546789",
        userEmail:  "luisprueba@gmail.com",
        userPassword: "passwordPrueba"
    },
    {
        //The userLastname is missing
        userName: "Luis",
        userDNI: 74563334,
        userPhoneNumber: "+345678546789",
        userEmail:  "luisprueba@gmail.com",
        userPassword: "passwordPrueba"
    },
    {
        //The userDNI is missing
        userName: "Luis",
        userLastname:"Gonzales",
        userPhoneNumber: "+345678546789",
        userEmail:  "luisprueba@gmail.com",
        userPassword: "passwordPrueba"
    },
    {
        //The PhoneNumber is missing
        userName: "Luis",
        userLastname:"Gonzales",
        userDNI: 74563334,
        userEmail:  "luisprueba@gmail.com",
        userPassword: "passwordPrueba"
    },
    {
        //The email is missing
        userName: "Luis",
        userLastname:"Gonzales",
        userDNI: 74563334,
        userPhoneNumber: "+345678546789",
        userPassword: "passwordPrueba"
    },
    {
        //The password is missing
        userName: "Luis",
        userLastname:"Gonzales",
        userDNI: 74563334,
        userPhoneNumber: "+345678546789",
        userEmail:  "luisprueba@gmail.com"
    }
]



//Array for validate testing
export const dataUserValidate = [
    {
        userName: "Luis",
        userLastname:"Gonzales",
        userDNI: 74563334,
        userPhoneNumber: "+345678546789",
        userEmail:  "luisprugmail.com", //Email validate is wrong
        userPassword: "passwordPrueba"
    },
    {
        userName: "Jose",
        userLastname:"Diaz",
        userDNI: 75434563,
        userPhoneNumber: "+34567854678954", //phoneNumber have more than 13 characteres
        userEmail:  "joseprueba@gmail.com",
        userPassword: "passwordPrueba"
    },
    {
        userName: "Maria",
        userLastname:"Rosa",
        userDNI: "73456789",  //DNI is not a number
        userPhoneNumber: "+345678546789",
        userEmail:  "mariaprueba@gmail.com",
        userPassword: "passwordPrueba"
    }
]