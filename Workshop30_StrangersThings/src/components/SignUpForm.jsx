import { useState } from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../utlities/constants";
import { saveTokenSessionStorage } from "../auth/sessionStorage";


export default function SignUpForm({ setToken }) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [error, setError] = useState(null);

 
  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const registerUser = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                username: userName, 
                password: password 
              }
            })
          });
        const result = await response.json();
        
        console.log(result);
        if (result && result.data && result.data.token) {
          const token = result.data.token
          setToken(token);
          saveTokenSessionStorage(token);
         
        }
        return result;
      } catch (err) {
        console.error(err);
      }
    };

    registerUser();
  }

  return (
    <div id="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
        </label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>
          Password:
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>
          Confirm Password:
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

SignUpForm.propTypes = {
  setToken: PropTypes.func.isRequired,
};
