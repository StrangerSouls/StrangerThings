import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import Home from './components/Home'
import SignUpForm from "./components/SignUpForm"
import Authenticate from "./components/Authenticate"

import './App.css'



function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <SignUpForm token={token} setToken={setToken} />
      <Authenticate token={token} setToken={setToken} />
    
    
    <div id="container" >
      <h1>Team 9 Craigslist Type App</h1>
      <div></div>
      <div id="main-section">
        <Routes>
          <Route path='/' element={<Home />} exact/>
          <Route path='/signupform' element={<SignUpForm />}/>
          <Route path='/signin' element={<Authenticate />}/>
        </Routes>
      </div>
    </div>
    </>
       
  )
}

export default App
