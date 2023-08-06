import { Routes, Route } from "react-router-dom"
import Home from './components/Home'

import './App.css'

function App() {
  

  return (
    
    <div id="container" >
      <h1>My App</h1>
      <div id="main-section">
        <Routes>
          <Route path='/' element={<Home />} exact/>
        </Routes>
      </div>
    </div>
       
  )
}

export default App
