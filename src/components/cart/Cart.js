import React from 'react';
import './Cart.css'
import ProductItem from '../product-item/ProductItem.js';

const Cart = () => {

    return(  
        <div className="Cart">
            <div class="card-cart">
                <div class="cart-header">
                    <div class="cart-title">
                        Shopping Cart
                    </div>
                </div>

                <div class="cart-body">
                    <ProductItem />
                    <ProductItem />
                </div>
            </div>
        </div>
    );
};
  
export default Cart;