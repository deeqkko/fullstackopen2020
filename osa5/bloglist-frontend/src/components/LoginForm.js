import React from 'react'

const LoginForm = ({
    username,
    password,
    handleLogin,
    setUsername,
    setPassword
}) => {
   return(
    <form onSubmit={handleLogin}>
        <div>
            Username:
            <input 
                type="text"
                value={username}
                name="Username"
                onChange={setUsername}
                />
        </div>
        <div>
            Password:
            <input
                type="password"
                value={password}
                name="Password"
                onChange={setPassword}
                />
        </div>
        <button type="submit">Login</button>
    </form>
   
   )}

export default LoginForm