const app = require('../src/app')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../src/models/user')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')

const api = supertest(app)

var token = null

describe('Login API POST tests', () =>{
    beforeEach(async() => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash("le_secret", 10)

        let testUser = new User({
            username: "testuser",
            name: "Test User",
            passwordHash
        })
        await testUser.save()

        testUser = await User.findOne({ username: testUser.username })

        const userForToken = {
            username: testUser.username,
            id: testUser._id
        }

        token = await jwt.sign(userForToken, process.env.SECRET)

    })

    test('Token received with correct credentials', async() => {
        const user = {
            username: "testuser",
            password: "le_secret"
        }

        const response = await api
            .post('/api/login')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        expect(response.body.username).toContain(user.username)
        expect(response.body.name).toContain("Test User")
        expect(response.body.token).toBe(token)
    })

    test('Login fails with an error message and no token is received with incorrect username', async() => {
        const falseUser = {
            username: "tesuser",
            password: "le_secret"
        }

        const response = await api
            .post('/api/login')
            .send(falseUser)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(response.error.text).toContain('Invalid username or password')
        expect(response.body.token).not.toBeDefined()
        })

    test('Login fails with an error message and no token is received with incorrect password', async() => {
        const falseUser = {
            username: "testuser",
            password: "el_secret"
        }

        const response = await api
            .post('/api/login')
            .send(falseUser)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(response.error.text).toContain('Invalid username or password')
        expect(response.body.token).not.toBeDefined()
        })
    
    
})

afterAll(() => {
    mongoose.connection.close()
})