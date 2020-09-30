import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateEntry = ({
  notificationHandler
}) => {

  const [newBlog, setNewBlog] = useState({
    title:'',
    author:'',
    url:''
  })

  const handleCreateEntryChange = (event) => {
    const value = event.target.value
    setNewBlog({
      ...newBlog,
      [event.target.name]: value
    })
  }

  const handleCreateEntrySubmit = async (event) => {
    event.preventDefault()
    console.log(`New Blog: ${JSON.stringify(newBlog)}`)
    const response = await blogService.create(newBlog)
    console.log(response)
    setNewBlog({
      title:'',
      author:'',
      url:''
    })
    notificationHandler({
      msg: 'A new blog posted!',
      error: false
    })
  }

  return(
    <form onSubmit={handleCreateEntrySubmit}>
      <div>
                Title:
        <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleCreateEntryChange}
        />
      </div>
      <div>
                Author:
        <input
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleCreateEntryChange}
        />
      </div>
      <div>
                Url:
        <input
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleCreateEntryChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default CreateEntry