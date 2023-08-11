import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utilities/constants';
import { getTokenFromSessionStorage } from '../auth/sessionStorage';
import { handleDeletePost } from '../utilities/deletePost';
//import UserLoader from './UserLoader';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const authToken = getTokenFromSessionStorage();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`${BASE_URL}/posts`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        const data = await response.json();
        setPosts(data.data.posts);
      } catch (error) {
        console.log(`Error fetching all posts`);
      }
    }

    fetchPosts();
  }, [authToken]);

  const handlePostDeletion = async (postId) => {
    const deleted = await handleDeletePost(authToken, postId);

    if (deleted) {
      // Remove the deleted post from the state
      setPosts(posts.filter(post => post._id !== postId));
    }
  };

  return (
    <div>
      <div>
      <form>
        <label></label>
        <input type="text"/>
        <button type="submit">Search</button>
      </form>
      </div>
      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <h2>{post.title}</h2>            
            <p>{post.description}</p>
            <h4>Description</h4>
            <p>$ {post.price}</p>
            <p>Location: {post.location}</p>
            <p>Delivery Available? {post.willDeliver ? 'Yes' : 'No'}</p>
            {authToken && post.isAuthor && (
              <button onClick={() => handlePostDeletion(post._id)}>Delete Post</button>
            )}
            {authToken && !post.isAuthor && (
              <div>
                <Link to={`/send-message/${post._id}`}>
                  <button>Message Seller</button>
                </Link>
              </div>
            )}
            {/* {authToken && (post.isAuthor || post.messages.length > 0) && (
              <div>
                {post.messages.map((message) => (
                  <div key={message._id}>
                    <p>Message from: {message.fromUser.username}</p>
                    <p>Message: {message.content}</p>
                  </div>
                ))}
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
}
