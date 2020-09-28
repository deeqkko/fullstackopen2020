import React from 'react'

const CreateEntry = (props) => {
    return(
        <form onSubmit={props.entryHandler}>
            <div>
                Title:
                <input 
                    type="text"
                    value={props.title}
                    name="title"
                    onChange={props.setNewBlog}
                    />
            </div>
            <div>
                Author:
                <input
                    type="text"
                    value={props.author}
                    name="author"
                    onChange={props.setNewBlog}
                    />
            </div>
            <div>
                Url:
                <input
                    type="text"
                    value={props.url}
                    name="url"
                    onChange={props.setNewBlog}
                    />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default CreateEntry