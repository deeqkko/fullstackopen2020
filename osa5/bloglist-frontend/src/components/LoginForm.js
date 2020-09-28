import React from 'react'

const LoginForm = (props) => {
   return(
    <form onSubmit={props.handleLogin}>
        <div>
            Username:
            <input 
                type="text"
                value={props.username}
                name="Username"
                onChange={props.setUsername}
                />
        </div>
        <div>
            Password:
            <input
                type="password"
                value={props.password}
                name="Password"
                onChange={props.setPassword}
                />
        </div>
        <button type="submit">Login</button>
    </form>
   
   )}

export default LoginForm