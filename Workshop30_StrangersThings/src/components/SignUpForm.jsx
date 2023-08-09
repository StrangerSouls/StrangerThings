import { useState } from "react";
import PropTypes from "prop-types";
import { saveTokenSessionStorage } from "../utlities/sessionStorage";

export default function SignUpForm({ setToken }) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for password confirmation
  const [error, setError] = useState(null);

  const COHORT_NAME = '2302-ACC-CT-WEB-PT-B';
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

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
      <h1>SignUpForm</h1>
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
