const mongoose = require('mongoose')
const Blog = require('../src/models/blog')
const app = require('../src/app')
const blogHelpers = require('../src/utils/blog_helpers')

const supertest = require('supertest')
const blog_helpers = require('../src/utils/blog_helpers')
const api = supertest(app)

const initialBlogList = blogHelpers.blogs
const addEntry = blogHelpers.addEntry
const nullLikes = blogHelpers.nullLikes
const missingTitle = blogHelpers.missingTitle
const missingUrl = blogHelpers.missingUrl

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

    test(`All notes returned`, async() => {
        const response = await api.get(`/api/blogs`)
        expect(response.body).toHaveLength(initialBlogList.length)
    })

    test(`Single note returned`, async() => {
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

    test('Likes-field null conversion to 0', async () => {
        await api
            .post('/api/blogs')
            .send(nullLikes)
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
            .expect(400)
    })
    test(`Missing url field should return status 400`, async () => {
        await api
            .post('/api/blogs')
            .send(missingUrl)
            .expect(400)
    })
    
})

describe(`PUT-method tests`, () => {

    test(`Update likes count`, async() => {

        const blogs = await api.get('/api/blogs')
        if (blogs.body.length === 0) {
            await blog_helpers.postEntry(addEntry)
        }
        
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

    test('Delete a blog entry', async () => {

        const blogs = await api.get('/api/blogs')
        if (blogs.body.length === 0) {
            await blog_helpers.postEntry(addEntry)
        }

        const lastId = await blogHelpers.getLastId()
        await api
            .delete(`/api/blogs/${lastId}`)
            .expect(204)
    })
})

afterAll(() => {
    mongoose.connection.close()
})