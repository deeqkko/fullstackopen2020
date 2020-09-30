import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateEntry from './components/BlogForm'
import TogglableForm from './components/TogglableForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [ notification ])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token.toString())
    }
  }, [ setUser ])


  const loginForm = () => {
    return(
      <LoginForm
        handleLogin={handleLogin} 
        username={username}
        setUsername={({ target }) => setUsername(target.value)}
        password={password}
        setPassword={({ target }) => setPassword(target.value)}
      />
    )
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const loggedUserFunctions = () => {
    return(
      <>
        <p>Logged in as {user.name}</p>
        <div>
        <TogglableForm 
          showButtonLabel='New Blog'
          hideButtonLabel='Cancel'
          >
          <CreateEntry 
            notificationHandler={notificationHandler}
          />
          </TogglableForm>
        </div>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </>
    )
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

    window.localStorage.setItem(
      'loggedBlogAppUser',
      JSON.stringify(user)
      )

    setUser(user)
    setUsername('')
    setPassword('')
    } catch (exception) {
      notificationHandler({
        msg: "Incorrect username or password",
        error: false
      })
    }

  }

  const notificationHandler = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 5000)

  }

  return (
    <div>
      <h2>blogs</h2>
      {notification !== null && <h1>{notification.msg}</h1>}
      {user === null ?
        loginForm() :
        loggedUserFunctions()}
      {blogs
        .sort((a, b)=> 
        parseFloat(b.likes) - parseFloat(a.likes))
        .map(blog =>
        <Blog key={blog.id} 
              blog={blog} 
              user={user}
              notificationHandler={notificationHandler}
              />
      )}
    </div>
  )
}

export default App