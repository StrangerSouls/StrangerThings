import { useState } from 'react';

function LogInForm({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // loginUser is a function that calls the API
        try {
            const response = await loginUser({ username, password });

            if (response.error) {
                setError(response.error);
            } else {
                setToken(response.token);  // assuming the API returns a token on successful login
                setError(null);  // Clear any previous errors
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                placeholder="Username" 
            />
            <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Password" 
            />
            <button type="submit">Login</button>

            {error && <p className="error-message">{error}</p>}
        </form>
    );
}

export default LogInForm;
