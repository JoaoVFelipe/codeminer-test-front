import React from 'react';
import { ReactComponent as DefaultImage } from "../../assets/default-grey.svg";
import './ProductCard.css'

const ProductCard = () => {

  return(  
    <div className="Product">
        <div class="card">
            <DefaultImage/>
            <h1>{this.props.productData.name}</h1>
            <p class="price-ammount">$price - X left</p>
            <p><button>Add to Cart</button></p>
        </div>
    </div>
  );

};

export default ProductCard;