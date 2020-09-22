const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const blog_helpers = require('../utils/blog_helpers')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
      
  })

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog.toJSON())
})
  
blogsRouter.post('/', async (request, response) => {  
    const body = request.body
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog.likes === undefined ? blog.likes = 0 : blog.likes = blog.likes

    const savedBlog = await blog.save()
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
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

  module.exports = blogsRouter