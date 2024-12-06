import React, { useState, useEffect } from 'react';
import './ProductList.css'
import CartItem from './CartItem';
import { addItem, CartSlice } from './CartSlice';
import { plantsArray } from './consts/Plants';
import { useCart } from './providers/CartProvider';
import { CartIcon } from './icons/CartIcon';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false); // State to control the visibility of the About Us page
    const [addedToCart, setAddedToCart] = useState({});

    const { cart, addToCart, removeFromCart, totalItems } = useCart()


    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignIems: 'center',
        fontSize: '20px',
    }
    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    }
    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    }
    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); // Set showCart to true when cart icon is clicked
    };
    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true); // Set showAboutUs to true when "About Us" link is clicked
        setShowCart(false); // Hide the cart when navigating to About Us
    };

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handleContinueShopping = (e) => {
        // go back to the product list
        setShowCart(false);

    };
    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" style={{ textDecoration: 'none' }}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>

                </div>
                <div style={styleObjUl}>
                    <div> <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>Plants</a></div>
                    <div> <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
                        <h1 className='cart' >
                            <CartIcon />
                            <span>{totalItems}</span>
                        </h1>
                    </a>
                    </div>
                </div>
            </div>
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h1 style={{ textAlign: "center" }}>
                                <div>{category.category}</div>
                            </h1>
                            <div className="product-list">

                                {category.plants.map((plant, plantIndex) => {
                                    const isAdded = cart[plant.name] > 0;
                                    return (
                                        <div className="product-card" key={plantIndex}>
                                            <img className="product-image" src={plant.image} alt={plant.name} />
                                            <div className="product-title">{plant.name}</div>
                                            <div className="product-description">{plant.description}</div>
                                            <div className="product-cost">{plant.cost}</div>{ }
                                            <button
                                                className={`product-button ${isAdded ? 'added' : ''}`}
                                                onClick={() => {
                                                    isAdded ? removeFromCart(plant.name) : addToCart(plant.name);
                                                }}
                                            >
                                                {isAdded ? 'Added to Cart' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    )
                                }

                                )}
                            </div>
                        </div>
                    ))}




                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
