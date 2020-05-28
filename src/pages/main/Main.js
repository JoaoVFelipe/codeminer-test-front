import React, { Component }  from 'react';
import Header from '../../components/header/Header';
import Product from '../../components/product/Product';
import Cart from '../../components/cart/Cart';
import './Main.css'


class Main extends Component {

//Just rendering each component to test
  render(){
    return(  
      <div className="Main">
          <Header />
          <Product />
          <Cart />
      </div>
      )
  }

}

export default Main;