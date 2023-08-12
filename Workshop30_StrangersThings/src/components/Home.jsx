import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utilities/constants';
import { getTokenFromSessionStorage } from '../auth/sessionStorage';
import { handleDeletePost } from '../utilities/deletePost';

import './Home.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const authToken = getTokenFromSessionStorage();
  const [searchTerm, setSearchTerm] = useState("");

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
        console.log(data);
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

  const filteredPosts = posts.filter(post => (
    postMatches(post, searchTerm.toLowerCase())
  ));

  return (
    <div>
      <div>
        <form>
          <label>Search Posts: </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className='search-button'>Search</button>
        </form>
      </div>
      <div className="post-container">
        {filteredPosts.map((post) => (
          <div key={post._id} className="post">
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <h4>Description</h4>
            <p>${post.price}</p>
            <p>Location: {post.location}</p>
            <p>Delivery Available? {post.willDeliver ? 'Yes' : 'No'}</p>
            {authToken && post.isAuthor && (
              <button onClick={() => handlePostDeletion(post._id)} className="delete-button">Delete Post</button>
            )}
            {authToken && !post.isAuthor && (
              <div>
                <Link to={`/send-message/${post._id}`}>
                  <button className="message-button">Message Seller</button>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function postMatches(post, text) {
  return (
    post.title.toLowerCase().includes(text) ||
    post.description.toLowerCase().includes(text) ||
    post.location.toLowerCase().includes(text)
  );
}
