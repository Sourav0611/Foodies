import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './pages/Home/Home'
import { Cart } from './pages/Cart/Cart'
import { PlaceOrder } from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';


const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  return (
  <>
  {showLogin? <LoginPopup/> : <></>}
    <div className='app'>
      <Router>
        <Navbar setShowLogin={setShowLogin}/>
        {/* <LoadingBar color="#f11946" progress={progress} /> */}
        <Routes>
          <Route
            exact path="/" element={<Home/>}
          />
          <Route exact path="/cart" element={<Cart/>}
          />
          <Route
            exact path="/order" element={<PlaceOrder/>}
          />
        </Routes>
      </Router>
    </div>
    <Footer/>
  </>
  )
}

export default App