import React, { useState } from 'react';

const Create = ({ posts, setPosts }) => {
    const [title, setTitle] = useState([])
    const [body, setBody] = useState([])

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        // console.log('title, body', title, body)
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({
                title,
                body,
            })
        });
        const data = await response.json()
        console.log('data', data)
        setPosts([data, ...posts])
        setTitle('')
        setBody('')
    }

    return <>
        <h3>Create a Post</h3>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='title' value={title} onChange={(ev) => setTitle(ev.target.value)}></input>
            <input type="text" placeholder='body' value={body} onChange={(ev) => setBody(ev.target.value)}></input>
            <button type='submit' className='btn btn-outline-primary'>Submit</button>
        </form>
    </>
}

export default Create;