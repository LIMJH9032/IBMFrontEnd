import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const img = (seed) => `https://picsum.photos/seed/${seed}/200/200`;

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: img('snake-plant'), cost: 15 },
      { name: 'Spider Plant', image: img('spider-plant'), cost: 12 },
      { name: 'Peace Lily', image: img('peace-lily'), cost: 18 },
      { name: 'Boston Fern', image: img('boston-fern'), cost: 20 },
      { name: 'Rubber Plant', image: img('rubber-plant'), cost: 17 },
      { name: 'Aloe Vera', image: img('aloe-vera'), cost: 14 },
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      { name: 'Lavender', image: img('lavender'), cost: 20 },
      { name: 'Jasmine', image: img('jasmine'), cost: 18 },
      { name: 'Rosemary', image: img('rosemary'), cost: 15 },
      { name: 'Mint', image: img('mint'), cost: 12 },
      { name: 'Lemon Balm', image: img('lemon-balm'), cost: 14 },
      { name: 'Basil', image: img('basil'), cost: 10 },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', image: img('zz-plant'), cost: 25 },
      { name: 'Pothos', image: img('pothos'), cost: 10 },
      { name: 'Cast Iron Plant', image: img('cast-iron'), cost: 22 },
      { name: 'Jade Plant', image: img('jade-plant'), cost: 16 },
      { name: 'Succulent Mix', image: img('succulent'), cost: 13 },
      { name: 'Cactus', image: img('cactus'), cost: 9 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  return (
    <div>
      {/* Navbar: shown on both Plants and Cart pages */}
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
            🛒 Cart <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((group) => (
            <section key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="plants-row">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>${plant.cost}</p>
                    <button
                      className="add-btn"
                      disabled={isInCart(plant.name)}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {isInCart(plant.name) ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
