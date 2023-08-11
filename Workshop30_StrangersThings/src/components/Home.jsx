import { useEffect, useState } from 'react';
import { BASE_URL } from '../utlities/constants';
import { getTokenFromSessionStorage } from '../auth/sessionStorage';

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

  return (
    <div>  
      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>{post.price}</p>
            <p>Location: {post.location}</p>
            <p>Delivery Available? {post.willDeliver ? 'Yes' : 'No'}</p>
            {authToken && (post.isAuthor || post.messages.length > 0) ? (
              <div>
                {/* Display messages for posts created by the logged-in user */}
                {post.messages.map((message) => (
                  <div key={message._id}>
                    <p>Message from: {message.fromUser.username}</p>
                    <p>Message: {message.content}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
