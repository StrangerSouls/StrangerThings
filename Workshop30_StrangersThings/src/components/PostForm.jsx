import { useState } from 'react';
import { BASE_URL } from '../utilities/constants';
import { getTokenFromSessionStorage } from '../auth/sessionStorage';

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [location, setLocation] = useState("");
  const [isPostSuccess, setIsPostSuccess] = useState(false); // New state for post success message

  async function handleSubmit(event) {
    event.preventDefault();

    const createPost = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getTokenFromSessionStorage()}` 
          },
          body: JSON.stringify({
            post: {
              title: title,
              description: description,
              price: price,
              location: location,
              willDeliver: willDeliver,
            }
          })
        });
        const result = await response.json();
        console.log(result);

        if (response.ok) {
          setIsPostSuccess(true); // Set post success state to true
          setTitle(""); // Clear form inputs
          setDescription("");
          setPrice("");
          setWillDeliver(false);
          setLocation("");
        }

        return result;
      } catch (err) {
        console.error(err);
      }
    }

    createPost(); 
  }

  return (
    <div>
      {isPostSuccess && (
        <div>
          <p>Your post was created successfully!</p>
        </div>
      )}

      <h1>Create Post</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Description: </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label>Price: $</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label>Location: </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)} 
            required
          />
          <label>Will You Deliver the Item? </label>
          <select
            value={willDeliver}
            onChange={(e) => setWillDeliver(e.target.value)}
            required
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
