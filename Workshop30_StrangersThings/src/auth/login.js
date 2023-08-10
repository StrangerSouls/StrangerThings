import { saveTokenSessionStorage } from "./sessionStorage";
//import { BASE_URL } from '../utilities/constants';

export async function loginUser(username, password) {
	const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
	const COHORT_NAME = '2302-ACC-CT-WEB-PT-B';
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
			console.log(result)
			console.log("Result should be above this")

			if (result && result.data && result.data.token) {
				const token = result.data.token;
				saveTokenSessionStorage(token);
			}

			return result;
	}catch (err) {
		console.error(err);
	}
}