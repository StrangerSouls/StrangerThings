import { useState } from "react";
import PropTypes from "prop-types";
import { loginUser } from "../auth/login"; 
import { BASE_URL } from "../utlities/constants";

export default function LogInForm({ setToken }) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // ... LogInForm component code ...

  return (
   <div>
	<h1> Log In </h1>
	<form>

	</form>
   </div>

  );
}

LogInForm.propTypes = {
  setToken: PropTypes.func.isRequired,
};
