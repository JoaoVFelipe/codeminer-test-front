import React from 'react';
import Header from '../../components/header/Header';
import Cart from '../../components/cart/Cart';
import Products from '../../components/products/Products';
import './Main.css'


const Main = () => {

  return(  
    <div className="Main">
      <div class="main-grid">
        <div class="header">
          <Header />
        </div>

        <div class="products">
          <Products />
        </div>
          
        <div class="cart">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Main;