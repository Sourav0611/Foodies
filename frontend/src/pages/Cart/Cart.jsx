import React, { useContext, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets'; 
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, foodList, removeFromCart, getTotalCartAmount, token } = useContext(StoreContext);

  const navigate = useNavigate();

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Only proceed if token exists and there are items in the cart
  const handleProceedToCheckout = () => {
    if (!token) {
      alert("Please log in before proceeding.");
      navigate("/login");
    } else if (Object.keys(cartItems).length === 0) {
      alert("Your cart is empty. Add items before proceeding.");
    } else {
      navigate("/order");
    }
  };

  if (Object.keys(cartItems).length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  return (
    <div className="cart">
      <div className="cart-items-title">
        <p>Image</p>
        <p>Name</p>
        <p>Quantity</p>
        <p>Price</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      {Object.keys(cartItems).map((itemId) => {
        const item = foodList.find((food) => food._id === itemId);
        if (!item) return null;
        const totalItemPrice = item.price * cartItems[itemId];

        return (
          <div key={itemId} className="cart-items-item">
            <img src={assets[item.image]} alt={item.name} />
            <p>{item.name}</p>
            <p>{cartItems[itemId]}</p>
            <p>${item.price}</p>
            <p>${totalItemPrice}</p>
            <p className="cross" onClick={() => removeFromCart(itemId)}>×</p>
          </div>
        );
      })}

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Total</h2>
          <div className="cart-total-details">
            <b>Total:</b>
            <p>${getTotalCartAmount()}</p>
          </div>
          <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
