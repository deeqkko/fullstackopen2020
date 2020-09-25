const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user',{ username: 1, name: 1})
    response.json(blogs.map(blog => blog.toJSON()))
      
  })

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('user',{ username: 1, name: 1})
    response.json(blog.toJSON())
})
  
blogsRouter.post('/', async (request, response) => {
    const token = request.token

    if(!token) {
        return response.status(401).json({ error: 'Missing or invalid token'})
    }
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'Missing or invalid token'})
    }

    const body = request.body

    const user = await User.findById(decodedToken.id)


    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    blog.likes === undefined ? blog.likes = 0 : blog.likes = blog.likes

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  })

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        likes: body.likes
    }

    const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
    response.json(updateBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
    const token = request.token

    if(!token) {
        return response.status(401).json({ error: 'Missing or invalid token'})
    }
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'Missing or invalid token'})
    }

    const blogEntry = await Blog.findById(request.params.id)


    if (blogEntry.user.toString() !== decodedToken.id.toString()) {
        return response.status(401).json({ error: `User not authorized to delete entry ${blogEntry._id}`})
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

  module.exports = blogsRouter