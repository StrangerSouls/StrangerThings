import { useEffect, useState } from "react";
import { getUserData } from "../utilities/userData";
import { getTokenFromSessionStorage } from '../auth/sessionStorage';

function UserLoader() {
	const [user, setUser] = useState(null);
  
	useEffect(() => {
		const authToken = getTokenFromSessionStorage();
	if (authToken) {
		// Fetch user data and set it in the state
		getUserData(authToken)
		.then(userData => {
			//console.log(userData);
			setUser(userData.data)})
		.catch(error => console.error('Error fetching user data:', error));
	}
	}, []);
  
	return (
		<div>
		{user ? (
		<div>
			<h2>Welcome {user.username}</h2>
			<h3>Your Posts</h3>
			<ul>
			{user.posts
              .filter(post => post.author._id === user._id) // Filter posts by author's _id
              .map(post => (
                <li key={post._id}>{post.title}</li>
              ))}
			</ul>
			<ul>
			{user.posts.map(post => (
				<li key={post._id}>{post.title}</li>
			))}
			</ul>
			<h3>Messages Received</h3>
			<ul>
			{user.messages
				.filter(message => message.fromUser !== user._id) // Filter messages sent by others
				.map(message => (
				<div key={message._id}>
					<p>From: {message.fromUser.username}</p>
					<p>Content: {message.content}</p>
					<p>Post: {message.post.title}</p>
				</div>
				))}
			</ul>
			<h3>Messages You Sent</h3>
			<ul>
			{user.messages
				.filter(message => message.fromUser._id === user._id) // Filter messages by sender's _id
				.map(message => (
				<div key={message._id}>
					<p>From: {message.fromUser.username}</p>
					<p>Content: {message.content}</p>
					<p>Post: {message.post.title}</p>
				</div>
				))}
			</ul>
					</div>
		) : (
		<p>You are not logged in. Please Log in to view this page.

		</p>
		)}
	</div>
	);
	
  }
  
  export default UserLoader;