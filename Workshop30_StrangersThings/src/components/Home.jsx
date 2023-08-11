import { useEffect, useState } from 'react';
import { BASE_URL } from '../utlities/constants';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`${BASE_URL}/posts`);
        const data = await response.json();
		console.log(data)
        setPosts(data.data.posts); 
      } catch (error) {
        console.log(`Error fetching all posts`);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div>
   
      
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
			<p>{post.description}</p>
			<p>{post.price}</p>
			<p>Location: {post.location}</p>
			<p>Delivery Available? {post.WillDeliver}</p>
			


        </div>
      ))}
    </div>
    </div>
  );
}
