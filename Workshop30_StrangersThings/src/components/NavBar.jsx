import { Link } from "react-router-dom";

export default function NavBar() {
	return (
		<nav>
			<div><Link to="/">Home</Link></div>
			<div>
				<Link to="/signupform">Sign Up</Link>				
			</div>
			
		</nav>
	)
}