import { saveTokenSessionStorage } from "./sessionStorage";
import { BASE_URL } from '../utilities/constants';

export async function loginUser(username, password) {


	try {
		const response = await fetch(
			`${BASE_URL}/users/login`, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					user: {
						username,
						password
					}
				})
			});
			const result = await response.json();

			if (result && result.data && result.data.token) {
				const token = result.data.token;
				saveTokenSessionStorage(token);
			}

			return result;
	}catch (err) {
		console.error(err);
	}
}