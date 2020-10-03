Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
        username, password
    }).then(({ body }) => {
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('addUser', ({ username, name, password }) => {
    cy.request({
        url: 'http://localhost:3001/api/users',
        method: 'POST',
        body: { username, name, password }
    })

    cy.visit('http://localhost:3000')
})

Cypress.Commands.add('addBlog', ({ title, author, url, likes }) => {
    cy.request({
        url: 'http://localhost:3001/api/blogs',
        method: 'POST',
        body: { title, author, url, likes },
        headers: { 
            'Authorization': `bearer ${JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).token}`
        }
    })

    cy.visit('http://localhost:3000')
})
