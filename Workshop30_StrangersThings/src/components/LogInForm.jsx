import { useState } from "react";
import PropTypes from "prop-types";
import { loginUser } from "../auth/login"; 
import { saveTokenSessionStorage } from "../auth/sessionStorage";


export default function LogInForm({ setToken }) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(userName, password);
		console.log(response);
		console.log("response should log above");
      if (response && response.data && response.data.token) {
        const token = response.data.token;
        setToken(token);
		saveTokenSessionStorage(token); 
      }
    } catch (err) {
      setError("Invalid username or password");
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
