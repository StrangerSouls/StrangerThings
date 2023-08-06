import { useEffect, useState } from 'react';

export default function Home() {
  const COHORT_NAME = '2302-ACC-CT-WEB-PT-B';
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

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
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
}
