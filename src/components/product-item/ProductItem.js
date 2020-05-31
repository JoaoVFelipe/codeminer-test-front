import React from "react";
import {useDispatch} from 'react-redux';
import { ReactComponent as DefaultImage } from "../../assets/default-grey.svg";

import "./ProductItem.css";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  
  function addItem(){
    dispatch({type: 'UPDATE_AMMOUNT_ADD_TO_CART', product: props.productData});
  }

  function removeItem(){
    dispatch({type: 'UPDATE_AMMOUNT_REMOVE_FROM_CART', product: props.productData});
    if(props.productData.quantity === 1){
      dispatch({type: 'REMOVE_FROM_CART', product: props.productData});
    }
  } 

  return (
    <div className="ProductItem">
      <div class="item">
          <div class="image">
              <DefaultImage />
          </div>

          <div class="details">
              <div>{props.productData.name}</div>
              <div>
                  <span>DETAILS</span>
                  <span>{props.productData.quantity}</span>
              </div>
          </div>

          <div class="ammount-select">
              <button onClick={addItem}>
                  +
              </button>

              <button onClick={removeItem}>
                -
              </button>
          </div>
      </div>
    </div>
  );
};

export default ProductItem;
