import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { ReactComponent as DefaultImage } from "../../assets/default-grey.svg";
import './ProductCard.css'

const ProductCard = (props) => {
  const productsInCart = useSelector(state => state.listProductsInCart);
  const dispatch = useDispatch();

  //Function to add product on cart
  function addProductToCart(){
    if(!checkProductAlreadyOnCart()){
      dispatch({type: 'ADD_TO_CART', product: props.productData});
    }
    dispatch({type: 'UPDATE_AMMOUNT_ADD_TO_CART', product: props.productData});
  }

  //Check if the product is already on cart. If is the case, the add function only up the quantity;
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
            <div class="name">
              {props.productData.name}
            </div>
            
            <div>
              <p class="price-ammount">${props.productData.price},00  ·  {props.productData.available} left</p>
              <p><button onClick={addProductToCart}>Add to Cart</button></p>
            </div>
        </div>
    </div>
  );

};

export default ProductCard;