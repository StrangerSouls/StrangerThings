const TOKEN_KEY = "authToken";

export function saveTokenSessionStorage(token) {
	sessionStorage.setItem(TOKEN_KEY, token);
}

export function getTokenFromSessionStorage() {
	return sessionStorage.getItem(TOKEN_KEY);
}

export function clearTokenFromSessionStorage() {
	sessionStorage.removeItem(TOKEN_KEY);
}