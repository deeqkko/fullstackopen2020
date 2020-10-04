import React, { useState, useEffect, useRef } from 'react'
import blogsService from '../services/blogs'
import DeleteBlog from './DeleteBlog'
const Blog = ({ blog, user, notificationHandler }) => {

  const [visible, setVisible] = useState(false)
  const [likesAdd, setLikesAdd] = useState({
    likes: blog.likes
  })



  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }


  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const deleteBlogRef = useRef()

  const toggleVisible = () => {
    setVisible(!visible)
    setDelVisible()
  }

  const handleLikes = async() => {
    setLikesAdd({
      likes: blog.likes += 1
    })
    console.log(likesAdd)
    await blogsService.update(blog.id, { likes: blog.likes })
  }

  const handleDelete = () => {
    let deleteBlog = window.confirm(`Deleting ${blog.title}. Are you sure?`)
    if (deleteBlog) {
      blogsService.deleteBlog(blog.id)
      notificationHandler(`${blog.title} deleted.`)
    }

  }


  const setDelVisible = () => {

    if ((user) && (user.username && blog.user) && (user.username === blog.user.username)) {
      deleteBlogRef.current.toggleVisible(true)
    } else {
      deleteBlogRef.current.toggleVisible(false)
    }
  }

  useEffect(() => {
    setDelVisible() //eslint-disable-next-line
  }, [ toggleVisible ]) 


  return(
    <div>
      <div style={hideWhenVisible} className='hide'>
        <div style={blogStyle}>
          <h3>{blog.title}</h3>
          <p>{blog.author}</p>
          <button id='more' onClick={toggleVisible}>More</button>
        </div>
      </div>
      <div style={showWhenVisible} className='show'>
        <div style={blogStyle}>
          <h3>{blog.title}</h3>
          <div id="info">
          <p>
            <b>Author:</b> {blog.author}<br/>
            <b>URL:</b> {blog.url}<br/>
            <b>Likes:</b> {blog.likes}
            <button id='like' onClick={handleLikes}>Like</button>
          </p>
          </div>
          <button onClick={toggleVisible}>Hide</button>
          <DeleteBlog
            handleDelete={handleDelete}
            ref={deleteBlogRef}
          />
        </div>
      </div>
    </div>
  )
}

export default Blog
