import React, { Component }  from 'react';
import './Cart.css'
import ProductItem from '../product-item/ProductItem.js';

class Cart extends Component {
    
    render(){
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
        )
    }
  
  }
  
  export default Cart;