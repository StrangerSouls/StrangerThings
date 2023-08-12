import { BASE_URL } from './constants';

export async function getUserData(token) {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}