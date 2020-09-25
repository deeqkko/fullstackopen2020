const mongoose = require('mongoose')
const User = require('../src/models/user')
const app = require('../src/app')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const userHelpers = require('../src/utils/user_helpers')

const api = supertest(app)


describe('Basic POST-method tests', () => {
    beforeEach( async() => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('oh_so_secret', 10)
        const testUser = new User({
            username: "testuser",
            name: "Test User",
            passwordHash
        })

        await testUser.save()
        
    })

    test('Adding new user to db', async () => {
        
        const usersBefore = await userHelpers.getAllUsers()
        
        const newUser = userHelpers.newUser

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfter = await userHelpers.getAllUsers()

        expect(usersAfter).toHaveLength(usersBefore.length + 1)
    })
})

describe('GET-method tests', () => {



    test('Get all users', async() => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
    })
})

describe('Invalid input tests', () => {

    test('User creation fails if username is already in database', async() => {
        
        const duplicateUser = {
            username: "testuser",
            name: "Test User",
            password: "oh_so_secret"
        }

        await api
            .post('/api/users')
            .send(duplicateUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

    })

    test('User creation fails if username is missing', async() => {

        const noUserName = {
            name: "No Username",
            password: "nopasswd"
        }

        const response = await api
            .post('/api/users')
            .send(noUserName)
            .expect(400)
            .expect('Content-Type', /application\/json/)


        expect(response.error.text).toContain('Missing or invalid username')

    })

    test('User creation fails if username length is below 3 characters', async () => {
        const tooShortUser = {
            username: "ab",
            name: "Alfa Bravo",
            password: "NotYourBusiness"
        }

        const response = await api
            .post('/api/users')
            .send(tooShortUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.error.text).toContain('Missing or invalid username')
    })

    test('User creation fails if password is missing', async () => {
        const noPassword = {
            username: "icantremembermypassword",
            name: "Nimcompoop",
        }

        const response = await api
            .post('/api/users')
            .send(noPassword)
            .expect(400)

        expect(response.error.text).toContain('Missing or invalid password')
    })

    test('User creation fails if password length is below 3 characters', async () => {
        const invalidPassword = {
            username: "dumb",
            name: "Simpleton",
            password: "as"
        }

        const response = await api
            .post('/api/users')
            .send(invalidPassword)
            .expect(400)

        expect(response.error.text).toContain('Missing or invalid password')
    })
})

afterAll(() => {
    mongoose.connection.close()
})