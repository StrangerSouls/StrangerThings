import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import Home from './components/Home'
import SignUpForm from "./components/SignUpForm"
import NavBar from "./components/NavBar"


import './App.css'



function App() {
  return (
    <>
        
    <div id="container" >
      <NavBar />
      <h1>Team 9 Stranger's Things</h1>
      <div></div>
      <div id="main-section">
        <Routes>
          <Route path='/' element={<Home />} exact/>
          <Route path='/signupform' element={<SignUpForm />}/>
          {/* <Route path='/signin' element={<Authenticate />}/> */}
        </Routes>
      </div>
    </div>
    </>
       
  )
}

export default App
