import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Create from './Create';
import Update from './Update';

const URL = "https://jsonplace-univclone.herokuapp.com/posts";

const App = () => {
  const [posts, setPosts] = useState([])
  const [postId, setPostId] = useState(null)
  console.log('posts', posts)

  const handleDelete = async (postIdToDelete) => {
    const response = await fetch(`${URL}/${postIdToDelete}`, {
      method: 'DELETE',
    })


    const data = await response.json()
    if (data) {
      const newPosts = posts.filter(post => post.id !== postIdToDelete)
      setPosts(newPosts)
    }
  }


  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await fetch(URL)
      const data = await resp.json();
      setPosts(data);
    }
    fetchPosts()
  }, [])

  return <>
    <h1>
      {
        postId
          ? <Update posts={posts} setPosts={setPosts} postId={postId} />
          : <Create posts={posts} setPosts={setPosts} />

      }
    </h1>
    {
      posts.map(post => <div key={post.id}>
        <h3>{post.title}</h3>
        <div>{post.body}</div>
        <button onClick={() => setPostId(post.id)}>
          Edit
        </button>
        <button onClick={() => handleDelete(post.id)}>
          Delete
        </button>

      </div>)
    }
  </>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

