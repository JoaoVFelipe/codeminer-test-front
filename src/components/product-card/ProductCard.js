import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { ReactComponent as DefaultImage } from "../../assets/default-grey.svg";
import './ProductCard.css'

const ProductCard = (props) => {
  const productsInCart = useSelector(state => state.listProductsInCart);
  const dispatch = useDispatch();

  function addProductToCart(){
    if(!checkProductAlreadyOnCart()){
      dispatch({type: 'ADD_TO_CART', product: props.productData});
    }
    dispatch({type: 'UPDATE_AMMOUNT_ADD_TO_CART', product: props.productData});
  }
  

  function checkProductAlreadyOnCart(){
    let _return = false;
    productsInCart.map((productInCart) => {
      if(productInCart.id === props.productData.id){
        _return = true;
      }
      return _return;
    });
    return _return;
  }

  return(  
    <div className="Product">
        <div class="card">
            <DefaultImage/>
            <h1>{props.productData.name}</h1>
            <p class="price-ammount">${props.productData.price},00 ::: {props.productData.available} left</p>
            <p><button onClick={addProductToCart}>Add to Cart</button></p>
        </div>
    </div>
  );

};

export default ProductCard;