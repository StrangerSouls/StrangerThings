import { clearTokenFromSessionStorage } from "./sessionStorage";

export function logOut() {
	clearTokenFromSessionStorage();
}