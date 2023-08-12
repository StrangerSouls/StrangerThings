import { BASE_URL } from './constants';

export async function handleDeletePost(authToken, postId) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
		'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
	if (response.ok) {
		const result = await response.json();
		return result;
      
    } else {
      console.log('Delete request failed');
      return false; // Indicate deletion failure
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    return false; // Indicate deletion failure
  }
}
