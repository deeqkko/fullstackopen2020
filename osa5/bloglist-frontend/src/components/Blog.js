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

  const handleLikes = () => {
    setLikesAdd({
      likes: blog.likes += 1
    })
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
      console.log('True')
      deleteBlogRef.current.toggleVisible()
    }
  }

  useEffect(() => {
    const sendLikes = async () => {
      if (blog.id) {
        await blogsService.update(blog.id, likesAdd)
      }
    }
    sendLikes(likesAdd)
  }, [ handleLikes ]) //eslint-disable-line react-hooks/exhaustive-deps


  return(
    <div>
      <div style={hideWhenVisible} className='hide'>
        <div style={blogStyle}>
          <h3>{blog.title}</h3>
          <p>{blog.author}</p>
          <button onClick={toggleVisible}>More</button>
        </div>
      </div>
      <div style={showWhenVisible} className='show'>
        <div style={blogStyle}>
          <h3>{blog.title}</h3>
          <p>
            <b>Author:</b> {blog.author}<br/>
            <b>URL:</b> {blog.url}<br/>
            <b>Likes:</b> {blog.likes}
            <button onClick={handleLikes}>Like</button>
          </p>
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
