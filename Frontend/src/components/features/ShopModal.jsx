import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '../../context/AppContext';
import { SHOP_PRODUCTS, SHOP_CATS } from '../../data/shopData';
import './ShopModal.css';

const ShopModal = ({ onClose }) => {
  const { state } = useApp();
  const { xp } = state;
  const [cat, setCat] = useState('All');
  const [cart, setCart] = useState([]);
  
  // Dynamic XP Discount: 1% for every 500 XP, max 20%
  const xpDiscountPercent = Math.min(20, Math.floor(xp / 500));
  
  const filtered = SHOP_PRODUCTS.filter(p => cat === 'All' || p.category === cat);
  
  const getXpPrice = (price) => Math.round(price * (1 - xpDiscountPercent / 100));

  const addToCart = (id) => setCart(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  
  return createPortal(
    <div className="shop-modal-overlay" onClick={onClose}>
      <div className="shop-modal glass" onClick={e => e.stopPropagation()}>
        <div className="shop-modal-header">
          <div>
            <h2 className="shop-modal-title">🛍️ Health Store</h2>
            <div className="xp-discount-banner">
              ✨ <strong>{xpDiscountPercent}% XP Discount</strong> applied!
            </div>
          </div>
          <div className="shop-header-right">
            {cart.length > 0 && <span className="cart-pill">🛒 {cart.length}</span>}
            <button className="shop-modal-close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="shop-cats">
          {SHOP_CATS.map(c => (
            <button 
              key={c} 
              className={`shop-cat-btn ${cat === c ? 'active' : ''}`} 
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="shop-grid">
          {filtered.map(p => {
            const finalPrice = getXpPrice(p.price);
            return (
              <div key={p.id} className="shop-card glass">
                {p.sponsored && <span className="ad-tag">Ad</span>}
                <div className="shop-emoji">{p.emoji}</div>
                <div className="shop-badge" style={{background:`${p.color}20`,color:p.color}}>{p.badge}</div>
                <div className="shop-name">{p.name}</div>
                <div className="shop-brand">{p.brand}</div>
                <div className="shop-desc">{p.description}</div>
                <div className="shop-rating">{'⭐'.repeat(Math.round(p.rating))} {p.rating}</div>
                <div className="shop-pricing">
                  <span className="shop-current-price" style={{color:p.color}}>₹{finalPrice}</span>
                  <span className="shop-original-price">₹{p.price}</span>
                  <span className="shop-xp-tag">-{xpDiscountPercent}% XP</span>
                </div>
                <button 
                  className={`shop-cart-btn ${cart.includes(p.id)?'in-cart':''}`} 
                  style={cart.includes(p.id)?{borderColor:p.color,color:p.color}:{}} 
                  onClick={() => addToCart(p.id)}
                >
                  {cart.includes(p.id) ? '✓ Added' : 'Add to Cart 🛒'}
                </button>
              </div>
            );
          })}
        </div>

        {cart.length > 0 && (
          <div className="shop-checkout-bar">
            <span className="checkout-info">
              {cart.length} items · ₹{SHOP_PRODUCTS.filter(p => cart.includes(p.id)).reduce((s,p)=>s+getXpPrice(p.price),0).toLocaleString()}
            </span>
            <button className="checkout-btn-pill" onClick={() => alert('Payment integration coming soon! 🚀')}>
              Checkout →
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};


export default ShopModal;
