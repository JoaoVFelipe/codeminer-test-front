import React, { Component }  from 'react';
import './ProductItem.css'

class ProductItem extends Component {
    
    render(){
      return(  
        <div className="ProductItem">
            <div class="item">
        
                <div class="name-quantity">
                    <span>Product Name</span>
                    <span>Quantity: X</span>
                </div>
        
                <div class="total-price">$549</div>

                <div class="quantity">
                    <button class="plus-btn" type="button" name="button">
                        <img src="plus.svg" alt="" />
                    </button>
                    
                    <button class="minus-btn" type="button" name="button">
                        <img src="minus.svg" alt="" />
                    </button>
                </div>
        
                
            </div>
        </div>
        )
    }
  
  }
  
  export default ProductItem;