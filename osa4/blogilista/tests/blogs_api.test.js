const mongoose = require('mongoose')
const Blog = require('../src/models/blog')
const app = require('../src/app')
const blogHelpers = require('../src/utils/blog_helpers')

const supertest = require('supertest')
const api = supertest(app)

const initialBlogList = blogHelpers.blogs
const addEntry = blogHelpers.addEntry
const nullLikes = blogHelpers.nullLikes
const missingTitle = blogHelpers.missingTitle
const missingUrl = blogHelpers.missingUrl

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogList)
    
})

describe('Ex 4.8 tests', () => {
    test('All notes returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogList.length)
    })

    test('Correct content type (JSON)', async () => {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-type', /application\/json/)
    })
})

describe('Ex 4.9 test', () => {
    test(`Identifying field name is 'id'`, async () => {
        const response = await api.get('/api/blogs')
        expect(response.toJSON).toBeDefined(response.id)
    })
})

describe('Ex 4.10 test', () => {
    test(`Post a blog`, async () => {
        await api
            .post('/api/blogs')
            .send(addEntry)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const title = response.body.map(rs => rs.title)

        expect(response.body).toHaveLength(initialBlogList.length + 1)
        expect(title).toContain('Testblog')
        })
    })

describe('Ex 4.11 test', () => {
    test(`Likes-field null conversion to 0`, async () => {
        await api
            .post('/api/blogs')
            .send(nullLikes)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        const nullLikeEntry = response.body.filter(blog => blog.title === 'Fögeln er frysen')
        expect(nullLikeEntry[0].likes).toBe(0)
    })
})

describe('Ex 4.12 test', () => {
    test(`Missing title field should return status 400`, async () => {
        await api
            .post('/api/blogs')
            .send(missingTitle)
            .expect(400)
    })
    test(`Missing url field should return status 400`, async () => {
        await api
            .post('/api/blogs')
            .send(missingUrl)
            .expect(400)
    })
})


afterAll(() => {
    mongoose.connection.close()
})
