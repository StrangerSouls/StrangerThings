import { useState, useEffect} from "react";

export default function SignUpForm({token, setToken}) {
  const [userName, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(null);
  const COHORT_NAME = '2302-ACC-CT-WEB-PT-B';
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(`You got this! $$`);

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
			setToken(result.data.token);
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
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>
          Password:
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}
