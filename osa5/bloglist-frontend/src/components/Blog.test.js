import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

const blog = {
    title: "Test Blog",
    author: "Mrs Test",
    url: "testingtesting.net",
    likes: 1000
}

describe('Blog render tests', () => {
    

    test('Ex 5.13. Renders blog.title and blog.author by default, but not blog.url or blog.likes', () => {
        const component = render(
            <Blog blog={blog} />
        )

        const div = component.container.querySelector('.hide')

        expect(div).toHaveTextContent('Test BlogMrs TestMore')
        expect(div).not.toHaveTextContent('testingtesting.net1000')
    })

    test('Ex 5.14 Renders all components, when More button is used', () => {
        const mockMore = jest.fn()
        
        const component = render(
            <Blog blog={blog} toggleVisible={mockMore}/>
        )

        const button = component.getByText('More')
        fireEvent.click(button)

        expect(component.container).toHaveTextContent(
            'Test BlogAuthor: Mrs TestURL: testingtesting.netLikes: 1000LikeHide')
        
        //console.log(mockMore.mock.calls.length)
        
    })

    test('Ex 5.15. handleLikes is called twice when Like button is clicked twice', () => {
        const handleLikes = jest.fn()

        const component = render( 
            <button id='like' onClick={handleLikes}>Like</button>
            
        )
        
        const button = component.container.querySelector('#like')
        fireEvent.click(button)
        fireEvent.click(button)
        
        console.log(prettyDOM(button))
        
        expect(handleLikes.mock.calls.length).toBe(2)

    })

})