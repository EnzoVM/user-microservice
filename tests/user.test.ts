import index from '../src/index'
import request from 'supertest'
import {dataUserValidate, dataUserMissing} from './helpers/user.helps'

const {app, server} = index
const api = request(app)

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

    test('When one field or all fields are missing', async () => {
        for (const dataUser of dataUserMissing){
            const response = await api.post('/api/v1/user/createOwner').send(dataUser)
                .expect('Content-Type', /application\/json/)
                .expect(400)

            expect(response.body.message).toStrictEqual("Data is missing")
        }
    })

    test('When email/phoneNumber/DNI validate is wrong ', async () => {
        for (const dataUser of dataUserValidate) {
            const response = await api.post('/api/v1/user/createOwner').send(dataUser)
                .expect('Content-Type', /application\/json/)
                .expect(400)
                
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