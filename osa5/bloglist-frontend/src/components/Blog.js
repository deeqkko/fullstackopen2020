import React from 'react'
const Blog = ({ blog }) => (
  <div>
    <h3>{blog.title}</h3>
    <p>
      <b>Author:</b> {blog.author}<br/>
      <b>URL:</b> {blog.url}<br/>
      <b>Likes:</b> {blog.likes}
    </p>
    <br></br>
  </div>
)

export default Blog
