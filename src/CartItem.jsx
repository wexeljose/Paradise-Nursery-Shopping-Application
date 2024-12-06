import React from 'react';
import { removeItem, updateQuantity } from './CartSlice';
import { useCart } from './providers/CartProvider';
import './CartItem.css';
import { plantsArray } from './consts/Plants';

const CartItem = ({ onContinueShopping }) => {
  const { removeFromCart, addToCart, cart, totalItems, removeProductFromCart } = useCart();

 

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    Object.keys(cart).forEach((key) => {
      const item = plantsArray.flatMap(plant => plant.plants).find(p => p.name === key);
      const quantity = cart[key];
      if(item && quantity) {
        total += item.cost * quantity;
      }
    });
    return total;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    addToCart(item);
  };

  const handleDecrement = (item) => {
    removeFromCart(item);
  };

  const handleRemove = (item) => {
    removeProductFromCart(item);
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item, quantity) => {
    if(!item) return 0;
    if(typeof item.cost === 'string') {
      item.cost = parseFloat(item.cost.replace('$', ''));
    }
    return item.cost * quantity;
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {Object.keys(cart).map((key) => {
     
            const item = plantsArray.flatMap(plant => plant.plants).find(p => p.name === key);
            const quantity = cart[key];
          return item &&
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item.name)}>-</button>
                <span className="cart-item-quantity-value">{quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item.name)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item, quantity)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item.name)}>Delete</button>
            </div>
          </div>
        }
        )}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}
         >Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


