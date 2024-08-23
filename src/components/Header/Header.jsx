import React, { useState, useEffect } from 'react';
import './Header.css';

function Header() {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowText(prevShowText => !prevShowText);
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  return (
    <div className='header'>
        <div className='img1'></div>
        <div className='img2'></div>
        <div className='header-contents'>
            <div className="text1">
                {showText ? (
                    <h2 className="btext">Hey Foodies..<br/>Are you hungry?</h2>
                ) : (
                    <div className="gif"></div>
                )}
            </div>
            <div className='text2'>
                <p className="loading-text">🍽️ Come Taste Some Specials! 🍲</p>
            </div>
        </div>
    </div>
  );
}

export default Header;
