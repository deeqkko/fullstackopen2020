const blogs = [
    {
    title: "Yousa in big doo-doo dis time!",
    author: "Jar-Jar Binks",
    url: "https://doodoo.net",
    likes: 100,
    id: "5f4bbba760e1cd0b5540e5c3"
    },
    {
    title: "Why is it not working?",
    author: "Daniela DevOps",
    url: "https://boohoo.net",
    likes: 3000,
    id: "5f4d14ff776cd127e935f72c"
    },
    {
    title: "I want to be the Sultan instead of the Sultan!",
    author: "Iznogood",
    url: "https://izno.good/sultan",
    likes: 200,
    id: "5f4d1d938558ce2f723dafdd"
    },
    {
    title: "Da Blog",
    author: "Da Blogist",
    url: "https://dablog.net",
    likes: 33,
    id: "5f4fc3618d79994f130a60a5"
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
    likes: 1
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
    missingUrl

}
