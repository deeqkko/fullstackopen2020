const Blog = require('../models/blog')

const blogs = [
    {
    title: "Yousa in big doo-doo dis time!",
    author: "Jar-Jar Binks",
    url: "https://doodoo.net",
    likes: 100,
    id: "5f4bbba760e1cd0b5540e5c3",
    user: "5f6b623c23aad5cc91834118"
    },
    {
    title: "Why is it not working?",
    author: "Daniela DevOps",
    url: "https://boohoo.net",
    likes: 3000,
    id: "5f4d14ff776cd127e935f72c",
    user: "5f6b623c23aad5cc91834118"
    },
    {
    title: "I want to be the Sultan instead of the Sultan!",
    author: "Iznogood",
    url: "https://izno.good/sultan",
    likes: 200,
    id: "5f4d1d938558ce2f723dafdd",
    user: "5f6b623c23aad5cc91834118"
    },
    {
    title: "Da Blog",
    author: "Da Blogist",
    url: "https://dablog.net",
    likes: 33,
    id: "5f4fc3618d79994f130a60a5",
    user: "5f6b623c23aad5cc91834118"
    }
    ]

const bigNumbers = [
    {
        title: "Yousa in big doo-doo dis time!",
        author: "Jar-Jar Binks",
        url: "https://doodoo.net",
        likes: Math.pow(2, 53),
        id: "5f4bbba760e1cd0b5540e5c3"
        },
        {
        title: "Why is it not working?",
        author: "Daniela DevOps",
        url: "https://boohoo.net",
        likes: 1,
        id: "5f4d14ff776cd127e935f72c"
        }
    ]

const singleBlog = [
    {
    title: "Yousa in big doo-doo dis time!",
    author: "Jar-Jar Binks",
    url: "https://doodoo.net",
    likes: 100,
    id: "5f4bbba760e1cd0b5540e5c3"
    }
    ]

const addEntry = 
    {
    title: "Testblog",
    author: "Mrs Test",
    url: "testing.net",
    likes: 1,
    userId: "5f6b623c23aad5cc91834118"
    }


const nullLikes = {
    title: "Fögeln er frysen",
    author: "Skigge böy",
    url: "skiggeboy.net"
}

const missingTitle = {
    author: "Jankon Petoni",
    url: "jankonpetoni.kura"
}

const missingUrl = {
    title: "Petonia Petonia",
    author: "Jankon Petoni"
}
    



const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
        return blogs.map((blog) => blog.likes).reduce((a,b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
        const favorite = blogs.map((blog) => blog.likes).sort((a,b) => b - a)
        return blogs.filter((blog) => blog.likes === Number(favorite[0]))
}

const getFirstId = async () => {
    let response = await Blog.find({})
    let blogIds = response.map(blog => blog.id)
    return blogIds[0].toString()
}

const getLastId = async () => {
    let response = await Blog.find({})
    let blogIds = response.map(blog => blog.id)
    return blogIds.pop().toString()
}


const postEntry = async (addEntry) => {
    const blog = new Blog(addEntry)
    await blog.save()
}

module.exports = {
    blogs,
    singleBlog,
    bigNumbers,
    dummy,
    totalLikes,
    favoriteBlog,
    addEntry,
    nullLikes,
    missingTitle,
    missingUrl,
    getFirstId,
    getLastId,
    postEntry

}
