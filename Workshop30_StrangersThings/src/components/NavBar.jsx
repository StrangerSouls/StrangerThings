import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// { logOut } from "../auth/logOut";
import { clearTokenFromSessionStorage } from "../auth/sessionStorage";

export default function NavBar( {token, setToken} ) {
	const handleLogout = () => {
		//logOut()
		clearTokenFromSessionStorage();
		setToken(null)
	
	};
	return (
		<nav>
      <div>
        <Link to="/">Home</Link>
      </div>
      {!token || token.length === 0 ? (
        <>
          <div>
            <Link to="/signupform">Sign Up</Link>
          </div>
          <div>
            <Link to="/login">Log In</Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </div>
          <div>
            <Link to="/postform">Create New Post</Link>
          </div>
          <div>
            <Link to="/users/me">My Page</Link>
          </div>
        </>
      )}
    </nav>
	);
	}
	
	NavBar.propTypes = {
	token: PropTypes.string,
	setToken: PropTypes.func,
	};