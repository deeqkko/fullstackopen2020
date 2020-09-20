const blogHelpers = require('../src/utils/blog_helpers')
const app = require('../src/app')




const blogs = blogHelpers.blogs
const singleBlog = blogHelpers.singleBlog
const bigNumbers = blogHelpers.bigNumbers


describe(`Dummy`, () => {
    test(`Expected result 1`, () => {
        const blog = []

        const result = blogHelpers.dummy(blog)
        expect(result).toBe(1)
    })
})

describe(`totalLikes`, () => {
    test(`Sum of array.likes`, () => {
        expect(blogHelpers.totalLikes(blogs)).toBe(3333)
    })
    test(`Empty array`, () => {
        expect(blogHelpers.totalLikes([])).toBe(0)
    })
    test(`Result of a single blog array equals blog.likes`, () => {
        expect(blogHelpers.totalLikes(singleBlog)).toBe(100)
    })
    test(`Adding 1 to a 54 bit number equals 54 bit number`, () => {
        expect(blogHelpers.totalLikes(bigNumbers)).toBe(Math.pow(2, 53))
    })
})

describe(`favoriteBlog`, () => {
    test(`Gets the blog with largest blog.likes`, () => {
        expect(blogHelpers.favoriteBlog(blogs)).toEqual(
            [{
                title: "Why is it not working?",
                author: "Daniela DevOps",
                url: "https://boohoo.net",
                likes: 3000,
                id: "5f4d14ff776cd127e935f72c"
                }] 
        )
    })
})

