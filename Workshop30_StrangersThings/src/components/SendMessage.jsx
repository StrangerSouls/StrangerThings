import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../utlities/constants';
import { getTokenFromSessionStorage } from '../auth/sessionStorage';

export default function SendMessage() {
  const [message, setMessage] = useState("");
  const { postId } = useParams();
  const authToken = getTokenFromSessionStorage();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          message: {
            content: message
          }
        })
      });
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Send Message</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
