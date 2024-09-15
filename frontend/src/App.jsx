import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'


import { useEffect } from "react";

function App() {
  const [showLogin,setShowLogin] = useState(false)
  
  useEffect(() => {
    // Inject the embeddedChatbotConfig script
    const configScript = document.createElement("script");
    configScript.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "OkOA0ccf9iMf4RVVOOFnW",
        domain: "www.chatbase.co"
      };
    `;
    document.head.appendChild(configScript);

    // Inject the Chatbase script
    const chatbotScript = document.createElement("script");
    chatbotScript.src = "https://www.chatbase.co/embed.min.js";
    chatbotScript.setAttribute("chatbotId", "OkOA0ccf9iMf4RVVOOFnW");
    chatbotScript.setAttribute("domain", "www.chatbase.co");
    chatbotScript.defer = true;
    document.head.appendChild(chatbotScript);

    return () => {
      document.head.removeChild(configScript);
      document.head.removeChild(chatbotScript);
    };
  }, []);

  return (
    <div className="App">
      {/* Other components */}
      <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
        <Navbar setShowLogin={setShowLogin}  />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
    </div>
  );
}

export default App;

