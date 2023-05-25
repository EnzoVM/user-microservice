import index from '../src/index'
import request from 'supertest'
import {
dataOwnerUserValidate, 
dataOwnerUserMissing,
dataEmployeeUserMissing,
dataEmployeeUserValidate,
dataForLoginMissing} from './helpers/user.helps'

const {app, server} = index
const api = request(app)
const adminToken = process.env.ADMIN_TOKEN
const ownerToken = process.env.OWNER_TOKEN
const tokenInvalid = 'ecnecnenne3jrn4rn4jrn4r'

describe('POST /createOwner', () => {

    test('should create a new owner', async () => {
        const response = await api.post('/api/v1/users/createOwner').send({
            userName: "Luis",
            userLastname:"Gonzales",
            userDNI: 74563334,
            userPhoneNumber: "+345678546789",
            userEmail:  "luisprueba@gmail.com",
            userPassword: "passwordPrueba"
        }).set('Authorization', `Bearer ${adminToken}`)
          .expect('Content-Type', /application\/json/)
          .expect(201)
        
        expect(response.body.data.userName).toStrictEqual("Luis")
    })

    test('When there is not token', async () => {
        const response = await api.post('/api/v1/users/createOwner').send({
            userName: "Luis",
            userLastname:"Gonzales",
            userDNI: 74563334,
            userPhoneNumber: "+345678546789",
            userEmail:  "luisprueba@gmail.com",
            userPassword: "passwordPrueba"
        }).expect('Content-Type', /application\/json/)
          .expect(401)
        
        expect(response.body.message).toStrictEqual("Unauthorized access. A valid token is required")
    })

    test('When a token from another role is entered', async () => {
        const response = await api.post('/api/v1/users/createOwner').send({
            userName: "Luis",
            userLastname:"Gonzales",
            userDNI: 74563334,
            userPhoneNumber: "+345678546789",
            userEmail:  "luisprueba@gmail.com",
            userPassword: "passwordPrueba"
        }).set('Authorization', `Bearer ${ownerToken}`)  //this is not a admin token
          .expect('Content-Type', /application\/json/)
          .expect(403)
        
        expect(response.body.message).toStrictEqual("Access denied. Administrator role is required")
    })

    test('When a token entered is not valid', async () => {
        const response = await api.post('/api/v1/users/createOwner').send({
            userName: "Luis",
            userLastname:"Gonzales",
            userDNI: 74563334,
            userPhoneNumber: "+345678546789",
            userEmail:  "luisprueba@gmail.com",
            userPassword: "passwordPrueba"
        }).set('Authorization', `Bearer ${tokenInvalid}`)  //this is not a admin token
          .expect('Content-Type', /application\/json/)
          .expect(401)
        
        expect(response.body.message).toStrictEqual("Invalid token")
    })

    test('When one field or all fields are missing', async () => {
        for (const dataUser of dataOwnerUserMissing){
            const response = await api.post('/api/v1/users/createOwner').send(dataUser)
                .set('Authorization', `Bearer ${adminToken}`)
                .expect('Content-Type', /application\/json/)
                .expect(400)

            expect(response.body.message).toStrictEqual("Data is missing")
        }
    })

    test('When email/phoneNumber/DNI validate is wrong ', async () => {
        for (const dataUser of dataOwnerUserValidate) {
            const response = await api.post('/api/v1/users/createOwner').send(dataUser)
                .set('Authorization', `Bearer ${adminToken}`)
                .expect('Content-Type', /application\/json/)
                .expect(400)
                
            expect(response.body.message).toStrictEqual("You have to specify the requested data")
        } 
    })

    test('the users role must be owner', async () => {
        const response = await api.post('/api/v1/users/createOwner').send({
            userName: "Luis",
            userLastname:"Gonzales",
            userDNI: 74563334,
            userPhoneNumber: "+345678546789",
            userEmail:  "luisprueba@gmail.com",
            userPassword: "passwordPrueba"
        }).set('Authorization', `Bearer ${adminToken}`)
          .expect('Content-Type', /application\/json/)
          .expect(201)
        
        expect(response.body.data.roleId).toStrictEqual("41e37092-13fc-479c-9a1b-576305c5c888")
    })
})


describe('POST /createEmployee', () => {

    test('should create a new employee', async () => {
        const response = await api.post('/api/v1/users/createEmployee').send({
            userName: "Employee",
            userLastname:"ejemplo",
            userDNI: 73456345,
            userPhoneNumber: "+345656346789",
            userEmail:  "employeeprueba@gmail.com",
            userPassword: "passwordPrueba",
            restaurantId: "08f71c12-407f-44fa-a287-8ae32fef9e0b"
        }).set('Authorization', `Bearer ${ownerToken}`)
          .expect('Content-Type', /application\/json/)
          .expect(201)
        
        expect(response.body.data.userName).toStrictEqual("Employee")
    })

    test('When there is not token', async () => {
        const response = await api.post('/api/v1/users/createEmployee').send({
            userName: "Employee",
            userLastname:"ejemplo",
            userDNI: 73456345,
            userPhoneNumber: "+345656346789",
            userEmail:  "employeeprueba@gmail.com",
            userPassword: "passwordPrueba",
            restaurantId: "08f71c12-407f-44fa-a287-8ae32fef9e0b"
        }).expect('Content-Type', /application\/json/)
          .expect(401)
        
        expect(response.body.message).toStrictEqual("Unauthorized access. A valid token is required")
    })

    test('When a token from another role is entered', async () => {
        const response = await api.post('/api/v1/users/createEmployee').send({
            userName: "Employee",
            userLastname:"ejemplo",
            userDNI: 73456345,
            userPhoneNumber: "+345656346789",
            userEmail:  "employeeprueba@gmail.com",
            userPassword: "passwordPrueba",
            restaurantId: "08f71c12-407f-44fa-a287-8ae32fef9e0b"
        }).set('Authorization', `Bearer ${adminToken}`)  //this is not a owner token
          .expect('Content-Type', /application\/json/)
          .expect(403)
        
        expect(response.body.message).toStrictEqual("Access denied. Owner role is required")
    })

    test('When a token entered is not valid', async () => {
        const response = await api.post('/api/v1/users/createEmployee').send({
            userName: "Employee",
            userLastname:"ejemplo",
            userDNI: 73456345,
            userPhoneNumber: "+345656346789",
            userEmail:  "employeeprueba@gmail.com",
            userPassword: "passwordPrueba",
            restaurantId: "08f71c12-407f-44fa-a287-8ae32fef9e0b"
        }).set('Authorization', `Bearer ${tokenInvalid}`)
          .expect('Content-Type', /application\/json/)
          .expect(401)
        
        expect(response.body.message).toStrictEqual("Invalid token")
    })

    test('When one field or all fields are missing', async () => {
        for (const dataUser of dataEmployeeUserMissing){
            const response = await api.post('/api/v1/users/createEmployee').send(dataUser)
                .set('Authorization', `Bearer ${ownerToken}`)
                .expect('Content-Type', /application\/json/)
                .expect(400)

            expect(response.body.message).toStrictEqual("Data is missing")
        }
    })

    test('When email/phoneNumber/DNI validate is wrong ', async () => {
        for (const dataUser of dataEmployeeUserValidate) {
            const response = await api.post('/api/v1/users/createEmployee').send(dataUser)
                .set('Authorization', `Bearer ${ownerToken}`)
                .expect('Content-Type', /application\/json/)
                .expect(400)
                
            expect(response.body.message).toStrictEqual("You have to specify the requested data")
        } 
    })

    test('the users role must be employee', async () => {
        const response = await api.post('/api/v1/users/createEmployee').send({
            userName: "Employee",
            userLastname:"ejemplo",
            userDNI: 73456345,
            userPhoneNumber: "+345656346789",
            userEmail:  "employeeprueba@gmail.com",
            userPassword: "passwordPrueba",
            restaurantId: "08f71c12-407f-44fa-a287-8ae32fef9e0b"
        }).set('Authorization', `Bearer ${ownerToken}`)
          .expect('Content-Type', /application\/json/)
          .expect(201)
        
        expect(response.body.data.roleId).toStrictEqual("8f323445-48ea-4067-8a13-e8fa1f746e95")
    })
})


describe('POST / login', () => {

    test('The user should login', async () => {
        const response = await api.post('/api/v1/users/login').send({
            userEmail:  "admin@gmail.com",
            userPassword: "1234567"
        }).expect('Content-Type', /application\/json/)
          .expect(200)
        
        expect(response.body.message).toStrictEqual("The user has successfully logged in")
    })

    test('When one field or all fields are missing', async () => {
        for (const dataUser of dataForLoginMissing){
            const response = await api.post('/api/v1/users/login').send(dataUser)
                .expect('Content-Type', /application\/json/)
                .expect(400)

            expect(response.body.message).toStrictEqual("Data is missing")
        }
    })

    test('When email is not registered ', async () => {
        const response = await api.post('/api/v1/users/login').send({
            userEmail:  "emailnotregistered@gmail.com",  //email not registered
            userPassword: "1234567"
        }).expect('Content-Type', /application\/json/)
          .expect(400)
            
        expect(response.body.message).toStrictEqual("The email entered is not registered")
        
    })

    test('When the password does not match', async () => {
        const response = await api.post('/api/v1/users/login').send({
            userEmail:  "admin@gmail.com",
            userPassword: "passwordWrong"
        }).expect('Content-Type', /application\/json/)
          .expect(400)
        
        expect(response.body.message).toStrictEqual("The password entered does not match")
    })
})

afterAll(async () =>{
    await server.close()
})