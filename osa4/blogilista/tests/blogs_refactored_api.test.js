const mongoose = require('mongoose')
const Blog = require('../src/models/blog')
const User = require('../src/models/user')
const app = require('../src/app')
const blogHelpers = require('../src/utils/blog_helpers')
const jwt = require('jsonwebtoken')

const supertest = require('supertest')
const blog_helpers = require('../src/utils/blog_helpers')
const usersRouter = require('../src/controllers/users')
const { response } = require('express')
const api = supertest(app)

const initialBlogList = blogHelpers.blogs
//const addEntry = blogHelpers.addEntry
const nullLikes = blogHelpers.nullLikes
const missingTitle = blogHelpers.missingTitle
const missingUrl = blogHelpers.missingUrl

var correctToken, incorrectToken = null

describe(`GET-method tests`, () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogObjects = initialBlogList.map(blog => new Blog(blog))
        const promiseObjects = blogObjects.map(blog => blog.save())
        await Promise.all(promiseObjects)
    })

    test(`Correct content type (JSON)`, async() => {
        await api
            .get(`/api/blogs`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
    })

    test(`All blogs returned`, async() => {
        const response = await api.get(`/api/blogs`)
        expect(response.body).toHaveLength(initialBlogList.length)
    })

    test(`Single blog returned`, async() => {
        const firstId = await blogHelpers.getFirstId()

        const response = await api.get(`/api/blogs/${firstId}`)
        expect(response.body.title).toContain(`Yousa in big doo-doo dis time!`)
    })

    test('Identifying field name is id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.toJSON).toBeDefined(response.id)
    })
})

describe(`POST-method tests`, () => {
    beforeEach( async() => {
        await User.deleteMany({})
        await Blog.deleteMany({})
        const newUsers = [
            { username: "theuser", password: "el_secreto"},
            { username: "kekkonen", password: "urkkiIsTheMan"}
        ]

        for (newUser of newUsers) {
            await api
                .post('/api/users')
                .send(newUser)
        }

        const loginResponse = await api
            .post('/api/login')
            .send(newUsers[0])
            
        correctToken = 'Bearer ' + loginResponse.body.token   
        
    })
   
    test(`Post a blog`, async () => {

        const addEntry = {
            title: "Testblog",
            author: "Mrs Test",
            url: "testing.net",
            likes: 1,
            }
        
        const post = await api
            .post('/api/blogs')
            .send(addEntry)
            .set({ Authorization: correctToken })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        console.log(post.error)
        const response = await api.get('/api/blogs')
        const title = response.body.map(rs => rs.title)

        expect(title).toContain('Testblog')
        })

    test('Likes-field null conversion to 0', async () => {
        await api
            .post('/api/blogs')
            .send(nullLikes)
            .set({ Authorization: correctToken })
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        const nullLikeEntry = response.body.filter(blog => blog.title === 'Fögeln er frysen')
        expect(nullLikeEntry[0].likes).toBe(0)
    })

    test(`Missing title field should return status 400`, async () => {
        await api
            .post('/api/blogs')
            .send(missingTitle)
            .set({ Authorization: correctToken })
            .expect(400)
    })
    test(`Missing url field should return status 400`, async () => {
        await api
            .post('/api/blogs')
            .send(missingUrl)
            .set({ Authorization: correctToken })
            .expect(400)
    })
    
})

describe(`PUT-method tests`, () => {
    beforeEach(async() => {
        const addEntry = {
            title: "Testblog",
            author: "Mrs Test",
            url: "testing.net",
            likes: 1,
            }
    
        const blogs = await api.get('/api/blogs')
        if (blogs.body.length === 0) {
           await api
            .post('/api/blogs')
            .send(addEntry)
            .set({Authorization: correctToken})
        }
        
    })


    test(`Update likes count`, async() => {
        const blogId = await blogHelpers.getFirstId()
        const updateBlog = {
            likes: "3000"
        }

        await api
            .put(`/api/blogs/${blogId}`)
            .send(updateBlog)
            .expect(200)
        
        const response = await api.get(`/api/blogs/${blogId}`)
        expect(response.body.likes).toBe(3000)
    })
})

describe('DELETE-method tests', () => {
    beforeEach( async() => {
        await Blog.deleteMany({})

        const addEntry = {
            title: "Testblog",
            author: "Mrs Test",
            url: "testing.net",
            likes: 1,
            }

        const newUsers = [
            { username: "theuser", password: "el_secreto"},
            { username: "kekkonen", password: "urkkiIsTheMan"}
        ]

        const loginResponse = await api
            .post('/api/login')
            .send(newUsers[0])
            
        correctToken = 'Bearer ' + loginResponse.body.token
        
        await api
            .post('/api/blogs')
            .send(addEntry)
            .set({ Authorization: correctToken })
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Deleting a blog entry fails with an incorrect token', async () => {
        const lastId = await blogHelpers.getLastId()
        const response = await api
            .delete(`/api/blogs/${lastId}`)
            .set({ Authorization: incorrectToken })
            .expect(401)

        expect(response.error.text).toContain('Missing or invalid token')
        
    })

    test('Deleting a blog entry succeeds with a correct token', async () => {

        const lastId = await blogHelpers.getLastId()
        await api
            .delete(`/api/blogs/${lastId}`)
            .set({ Authorization: correctToken })
            .expect(204)
    })
})

afterAll(() => {
    mongoose.connection.close()
})