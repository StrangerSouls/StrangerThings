import { useEffect, useState } from "react";
import { getUserData } from "../utilities/userData";
import { getTokenFromSessionStorage } from '../auth/sessionStorage';
import { Link } from "react-router-dom";
import { handleDeletePost } from "../utilities/deletePost";

import './UserLoader.css'

function UserLoader() {
	const [user, setUser] = useState(null);

	console.log('User:', user);
  
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

	const handlePostDelete = async postId => {
		const authToken = getTokenFromSessionStorage();
		const result = await handleDeletePost(authToken, postId);
	
		if (result) {
 // Handle successful post deletion, e.g., refetch user data
 console.log('Post deleted successfully');
		} else {
 // Handle post deletion failure
		console.log('Post deletion failed');
		}
	};
  
	return (
		<div className="user-loader-container">
		{user ? (
		<div>
			<h2 className="user-loader-title">Welcome, {user.username}</h2>
			<h3>Your Posts</h3>
			<div >
				<ul>
				{user.posts
				.filter(post => post.author._id === user._id) // Filter posts by author's _id
				.map(post => (
					<li className="post" key={post._id}>{post.title}</li>
				))}
				</ul>
				<ul>
				{user.posts.map(post => (
  <li className="post" key={post._id}>
    <div className="post-container">
      <p className="post-title">{post.title}</p>
      <button className="delete-button" onClick={() => handlePostDelete(post._id)}>Delete</button>
    </div>
  </li>
))}
				</ul>

			</div>
			<h3>Messages Received</h3>
			<ul className="message-container">
			{user.messages
				.filter(message => message.fromUser._id !== user._id) // Filter messages sent by others
				.map(message => (
				<div className="message" key={message._id}>
					<p>From: {message.fromUser.username}</p>
					<p>Content: {message.content}</p>
					<p>Post: {message.post.title}</p>
				</div>
				))}
			</ul>
			<h3>Messages You Sent</h3>
			<ul className="message-container">
			{user.messages
            .filter(message => message.post && message.post.author._id !== user._id) // Filter messages sent by the user
            .map(message => (
              <div className="message" key={message._id}>
                <p>To User: {message.post.author ? message.post.author.username : 'Unknown User'}</p>
                <p>Content: {message.content}</p>
                <p>Post: {message.post ? message.post.title : 'Unknown Post'}</p>
              </div>
            ))}
			</ul>
					</div>
		) : (
		<p>You are not logged in. Please <Link to="/login">Log in</Link> to view this page.

		</p>
		)}
	</div>
	);
	
  }
  
  export default UserLoader;