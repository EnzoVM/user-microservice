import index from '../src/index'
import request from 'supertest'

const {app, server} = index
const api = request(app)

const dataUserValidate = [
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

describe('POST /createOwner', () => {

    test('should create a new restaurant owner', async () => {
        const response = await api.post('/api/v1/user/createOwner').send({
            userName: "Luis",
            userLastname:"Gonzales",
            userDNI: 74563334,
            userPhoneNumber: "+345678546789",
            userEmail:  "luisprueba@gmail.com",
            userPassword: "passwordPrueba"
        }).expect('Content-Type', /application\/json/)
          .expect(201)
        
        expect(response.body.data.userName).toStrictEqual("Luis")
    })

    test('When data user is missing ', async () => {
        const response = await api.post('/api/v1/user/createOwner').send({})
            .expect('Content-Type', /application\/json/)
            .expect(400)
    
        console.log(response.body);
    
        expect(response.body.message).toStrictEqual("Data is missing")
    })

    test('When email/phoneNumber/DNI validate is wrong ', async () => {
        for (const body of dataUserValidate) {
            const response = await api.post('/api/v1/user/createOwner').send(body)
                .expect('Content-Type', /application\/json/)
                .expect(400)
            
            console.log(response.body);
            expect(response.body.message).toStrictEqual("You have to specify the requested data")
        } 
    })

    test('the users role must be owner', async () => {
        const response = await api.post('/api/v1/user/createOwner').send({
            userName: "Luis",
            userLastname:"Gonzales",
            userDNI: 74563334,
            userPhoneNumber: "+345678546789",
            userEmail:  "luisprueba@gmail.com",
            userPassword: "passwordPrueba"
        }).expect('Content-Type', /application\/json/)
          .expect(201)
        
        expect(response.body.data.roleId).toStrictEqual("41e37092-13fc-479c-9a1b-576305c5c888")
    })
})

afterAll(async () =>{
    await server.close()
})