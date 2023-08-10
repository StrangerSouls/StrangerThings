import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import Home from './components/Home'
import SignUpForm from "./components/SignUpForm"
import LogInForm from "./components/LogInForm"
import NavBar from "./components/NavBar"



import './App.css'



function App() {
  const [, setToken] = useState(null);

  return (
    <>
        
    <div id="container" >
      <NavBar />
      <h1>Team 9 Stranger&apos;s Things</h1>
      <div></div>
      <div id="main-section">
        <Routes>
          <Route path='/' element={<Home />} exact/>
          <Route path='/signupform' element={<SignUpForm setToken={setToken}/>}/>
         
            <Route
              path="/login"
              element={<LogInForm setToken={setToken} />}
            />
        </Routes>
      </div>
    </div>
    </>
       
  )
}

export default App
