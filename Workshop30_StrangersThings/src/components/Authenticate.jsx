import { useState, useEffect } from "react";

export default function Authenticate () {
	const [userName, setUsername] = useState("");
	const [password, setPasword] = useState("");
	const [error, setError] = useState(null);

	return (
		<h1>Authenticate</h1>
	)
}