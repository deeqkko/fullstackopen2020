const blogHelpers = require('../src/utils/blog_helpers')

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
        const blog = blogHelpers.favoriteBlog(blogs)
        expect(blog[0].likes).toBe(3000)
    })

describe(`mostBlogs`, () => {
    test(`Returns the writer with most blogs (Ex 4.6)`, () => {
        const most = blogHelpers.mostBlogs()
        expect(most).toMatchObject(
            {
                author: 'Jakke & Sepi',
                blogs: 3
            })
    })
})

describe(`mostLikes`, () => {
    test(`Returns the writer with most likes`, () => {
        const mLikes = blogHelpers.mostLikes()
        expect(mLikes).toMatchObject({
            author: 'Jakke & Sepi',
            likes: 561125
        })
    })
})

})

