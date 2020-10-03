

describe('Blog tests', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('Ex 5.17. Login form is shown by default', function() {
        cy.contains('blogs')
        cy.contains('Username')
        cy.contains('Password')
            
    })

})

describe('Ex 5.18 Login tests', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.addUser({ username: 'mrsuser', name: 'Mrs User', password: 'testingtesting'})
        
    })

    it('Login success with correct credentials', function() {
        cy.get('#username').type('mrsuser')
        cy.get('#password').type('testingtesting')
        cy.get('#login-button').click()
        cy.contains('Logged in as Mrs User')
    })

    it('Login fails with incorrect username', function() {
        cy.get('#username').type('mrsurse')
        cy.get('#password').type('testingtesting')
        cy.get('#login-button').click()
        cy.contains('Incorrect username or password')
    })

})

describe('Ex 5.19 User can create a blog entry', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.addUser({ username: 'mrsuser', name: 'Mrs User', password: 'testingtesting'})
        cy.login({ username: 'mrsuser', password: 'testingtesting' })
    })

    it('Adding a blog', function() {
        cy.get('#newblog').click()
        cy.get('#title').type('Test Blog')
        cy.get('#author').type('Mr Test')
        cy.get('#url').type('testing.net')
        cy.get('#submit').click()

        cy.contains('Test Blog')
        cy.contains('Mr Test')
    })
})

describe('Ex 5.20 Blog entry functions', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.addUser({ username: 'mrsuser', name: 'Mrs User', password: 'testingtesting'})
        cy.login({ username: 'mrsuser', password: 'testingtesting' })
        cy.addBlog({ title: 'Test Blog', author: 'Mr Test', url: 'testing.net'})
    })

    it('A blog can be liked', function() {
        cy.get('#more').click()
        cy.get('#like').click()

        cy.contains('Likes: 1')
    })

})

describe('Ex 5.21 Blog entry deletion', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.addUser({ username: 'mrsuser', name: 'Mrs User', password: 'testingtesting'})
        cy.addUser({ username: 'mruser', name: 'Mr User', password: 'canada'})
        cy.login({ username: 'mrsuser', password: 'testingtesting' })
        cy.addBlog({ title: 'Test Blog', author: 'Mr Test', url: 'testing.net'})
    })

    it('Creator user can delete a blog', function() {
        
        cy.get('#more').click()
        cy.get('#delete').click()
        cy.get('#singleblog', { timeout: 10000 }).should('not.exist')        
        cy.get('#logout').click()
    })

    it('Non-creator user cannot delete a blog entry', function() {
        cy.login({ username: 'mruser', password: 'canada'})
        cy.get('#more').click()
        cy.get('#delete').should('not.visible')
    })
})

describe('Ex 5.22 Blog entry sorting by likes in descending order', function()  {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.addUser({ username: 'mrsuser', name: 'Mrs User', password: 'testingtesting'})
        cy.login({ username: 'mrsuser', password: 'testingtesting' })
        cy.addBlog({ title: 'Test Blog', author: 'Mr Test', url: 'testing.net', likes: 1 })
        cy.addBlog({ title: 'Best Blog', author: 'Mr Test', url: 'besttest.net', likes: 2 })
        cy.addBlog({ title: 'Fast Blog', author: 'Mr Test', url: 'fasttest.net', likes: 3 })

    })

    it('Blogs sorted', function() {
        

      
        cy.get(':nth-child(1) > .hide > div > #more')
            .then(() => {
                cy.get(':nth-child(1) > .show > [style="padding-top: 10px; padding-left: 5px; border: 2px solid; margin-bottom: 5px;"] > #info')
                    .should('contain', '3')
                    .should('not.contain', '2')
                    .should('not.contain', '1')
            })
       
    
        cy.get(':nth-child(2) > .hide > div > #more').click()
            .then(() => {
                cy.get(':nth-child(2) > .show > [style="padding-top: 10px; padding-left: 5px; border: 2px solid; margin-bottom: 5px;"] > #info')
                    .should('contain', '2')
                    .should('not.contain', '3')
                    .should('not.contain', '1')
            })

        cy.get(':nth-child(3) > .hide > div > #more').click()
            .then(() => {
                cy.get(':nth-child(3) > .show > [style="padding-top: 10px; padding-left: 5px; border: 2px solid; margin-bottom: 5px;"] > #info')
                    .should('contain', '1')
                    .should('not.contain', '2')
                    .should('not.contain', '3')
            })
        

    })
})