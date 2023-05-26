
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


export const dataEmployeeUserMissing = [
    {
        //All the data is missing
    },
    {
        //The userName is missing
        userLastname:"employeelastname",
        userDNI: 73452345,
        userPhoneNumber: "+345678546789",
        userEmail:  "employee@gmail.com",
        userPassword: "passwordPrueba",
        restaurantId: "08f71c12-407f-44fa-a287-8ae32fef9e0b"
    },
    {
        //The userLastname is missing
        userName: "EmployeePrueba100",
        userDNI: 73452345,
        userPhoneNumber: "+345678546789",
        userEmail:  "employee@gmail.com",
        userPassword: "passwordPrueba",
        restaurantId: "08f71c12-407f-44fa-a287-8ae32fef9e0b"
    },
    {
        //The userDNI is missing
        userName: "EmployeePrueba100",
        userLastname:"employeelastname",
        userPhoneNumber: "+345678546789",
        userEmail:  "employee@gmail.com",
        userPassword: "passwordPrueba",
        restaurantId: "08f71c12-407f-44fa-a287-8ae32fef9e0b"
    },
    {
        //The PhoneNumber is missing
        userName: "EmployeePrueba100",
        userLastname:"employeelastname",
        userDNI: 73452345,
        userEmail:  "employee@gmail.com",
        userPassword: "passwordPrueba",
        restaurantId: "08f71c12-407f-44fa-a287-8ae32fef9e0b"
    },
    {
        //The email is missing
        userName: "EmployeePrueba100",
        userLastname:"employeelastname",
        userDNI: 73452345,
        userPhoneNumber: "+345678546789",
        userPassword: "passwordPrueba",
        restaurantId: "08f71c12-407f-44fa-a287-8ae32fef9e0b"
    },
    {
        //The password is missing
        userName: "EmployeePrueba100",
        userLastname:"employeelastname",
        userDNI: 73452345,
        userPhoneNumber: "+345678546789",
        userEmail:  "employee@gmail.com",
        restaurantId: "08f71c12-407f-44fa-a287-8ae32fef9e0b"
    },
    {
        //The restaurant id is missing
        userName: "EmployeePrueba100",
        userLastname:"employeelastname",
        userDNI: 73452345,
        userPhoneNumber: "+345678546789",
        userEmail:  "employee@gmail.com",
        userPassword: "passwordPrueba"
    }
]


export const dataForLoginMissing = [
    {
        //All the data is missing
    },
    {
        //The email user is missing
        userPassword: "1234567"
    },
    {
        //The password user is missing
        userEmail: "admin@gmail.com",
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

export const dataEmployeeUserValidate = [
    {
        userName: "EmployeePrueba100",
        userLastname:"employeelastname",
        userDNI: 73452345,
        userPhoneNumber: "+345678546789",
        userEmail:  "employeegmail.com",  //Email validate is wrong
        userPassword: "passwordPrueba",
        restaurantId: "08f71c12-407f-44fa-a287-8ae32fef9e0b"
    },
    {
        userName: "EmployeePrueba100",
        userLastname:"employeelastname",
        userDNI: 73452345,
        userPhoneNumber: "+34567854678956",  //phoneNumber have more than 13 characteres
        userEmail:  "employee@gmail.com",
        userPassword: "passwordPrueba",
        restaurantId: "08f71c12-407f-44fa-a287-8ae32fef9e0b"
    },
    {
        userName: "EmployeePrueba100",
        userLastname:"employeelastname",
        userDNI: "73452345",   //DNI is not a number
        userPhoneNumber: "+345678546789",
        userEmail:  "employee@gmail.com",
        userPassword: "passwordPrueba",
        restaurantId: "08f71c12-407f-44fa-a287-8ae32fef9e0b"
    }
]