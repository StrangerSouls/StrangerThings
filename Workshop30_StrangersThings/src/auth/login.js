import { useState } from "react";
import PropTypes from "prop-types";
import { saveTokenSessionStorage } from "../auth/sessionStorage";
import { BASE_URL } from "../utlities/constants";

export default function LogInForm({ setToken }) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: userName,
            password: password,
          },
        }),
      });

      const result = await response.json();

      console.log(result);

      if (response.ok && result.data && result.data.token) {
        const token = result.data.token;
        setToken(token);
        saveTokenSessionStorage(token);
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred while logging in.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1> Log In </h1>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

LogInForm.propTypes = {
  setToken: PropTypes.func.isRequired,
};
