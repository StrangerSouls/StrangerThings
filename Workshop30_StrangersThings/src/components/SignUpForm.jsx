import { useState } from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../utilities/constants";
import { saveTokenSessionStorage } from "../auth/sessionStorage";

export default function SignUpForm({ setToken }) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignupSuccess, setIsSignUpSuccess] = useState(false);
  const [usernameTakenError, setUsernameTakenError] = useState(false);

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
        if (result.error && result.error.name === 'UserExists') {
          setUsernameTakenError(true);
          setError(null);
          return;
        }
        if (result && result.data && result.data.token) {
          const token = result.data.token;
          setToken(token);
          saveTokenSessionStorage(token);
          setIsSignUpSuccess(true);
        }
        return result;
      } catch (err) {
        console.error(err);
      }
    }

    registerUser();
  }

  return (
    <div id="container">
      {isSignupSuccess ? (
        <div>
          <h1>Sign Up Successful!</h1>
          <p>You can now log in with your credentials.</p>
        </div>
      ) : (
        <div>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label>
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            {error && <p>{error}</p>}
            {usernameTakenError && <p>Username is already taken.</p>}
            <button type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

SignUpForm.propTypes = {
  setToken: PropTypes.func.isRequired,
};
