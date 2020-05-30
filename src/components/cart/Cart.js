import React,  {useState} from 'react';
import {useSelector} from 'react-redux'
import './Cart.css'
import ProductItem from '../product-item/ProductItem.js';


const Cart = (props) => {
    const productsItemList = useSelector(state => state.listProductsInCart);

    function renderProductItem(product){
        return <div class="products-itens" key={product.id}> <ProductItem productData={product} /> </div>
    }

    return(  
        <div className="Cart">
            <div class="card-cart">
                <div class="cart-header">
                    <div class="cart-title">
                        Shopping Cart
                    </div>
                </div>

                <div class="cart-body">
                    {productsItemList.map(renderProductItem)}
                </div>
            </div>
        </div>
    );
};
  
export default Cart;