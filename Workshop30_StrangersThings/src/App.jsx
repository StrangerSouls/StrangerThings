import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import Home from './components/Home'
import SignUpForm from "./components/SignUpForm"
import LogInForm from "./components/LogInForm"
import NavBar from "./components/NavBar"
import PostForm from "./components/PostForm"
import SendMessage from "./components/SendMessage"
import UserMe from "./components/UserMe"
//import UserLoader from "./components/UserLoader"




import './App.css'
//import { saveTokenSessionStorage } from "./auth/sessionStorage"



function App() {
  const [token, setToken] = useState( sessionStorage.getItem("authToken") ? sessionStorage.getItem("authToken") : null);

  return (
    <>
        
    <div id="container" >
      <NavBar token={token} setToken={setToken}/>
      <h1>Team 9 Stranger&apos;s Things</h1>
      <div></div>
      <div id="main-section">
        <Routes>
          <Route path='/' element={<Home />} exact/>
          
          <Route path='/signupform' element={<SignUpForm setToken={setToken}/>}/>
          <Route path="/login" element={<LogInForm setToken={setToken} />}
          />
          <Route path="/send-message/:postId" element={<SendMessage />} />
          <Route path='/postform' element={<PostForm />} />
          <Route path="/users/me" element={<UserMe />} />
        
        </Routes>
      </div>
    </div>
    </>
       
  )
}

export default App
