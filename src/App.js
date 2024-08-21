import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './pages/Home/Home'
import { Cart } from './pages/Cart/Cart'
import { PlaceOrder } from './pages/placeOrder/PlaceOrder';


const App = () => {
  return (
    <div className='app'>
      <Router>
        <Navbar/>
        {/* <LoadingBar color="#f11946" progress={progress} /> */}
        <Routes>
          <Route
            exact
            path="/"
            element={<Home/>}
          />
          <Route
            exact
            path="/"
            element={<Cart/>}
          />
          <Route
            exact
            path="/"
            element={<PlaceOrder/>}
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App