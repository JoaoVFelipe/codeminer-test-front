import React, { Component }  from 'react';
import { ReactComponent as DefaultImage } from "../../assets/default-grey.svg";
import './Product.css'

class Product extends Component {
    
    render(){
      return(  
        <div className="Product">
            <div class="card">
                <DefaultImage/>
                <h1>Product name</h1>
                <p class="price-ammount">$price - X left</p>
                <p><button>Add to Cart</button></p>
            </div>
        </div>
        )
    }
  
  }
  
  export default Product;