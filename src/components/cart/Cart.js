import React, { useState, useEffect } from "react";
import { useSelector} from "react-redux";
import ProductItem from "../product-item/ProductItem.js";
import Vouchers from "../vouchers/Vouchers";
import { CartService } from "../../services/CartService";

import "./Cart.css";

const Cart = (props) => {
  const listProductItens = useSelector((state) => state.listProductsInCart);
  const listAppliedVouchers = useSelector((state) => state.listAppliedVouchers);

  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalWithDiscounts, setTotalWithDiscounts] = useState(0);

  const [totalDiscounts, setTotalDiscounts] = useState(0);

  //Update subtotal when the list of itens is updated
  useEffect(() => {
    setSubTotal(CartService.calcSubtotal(listProductItens));
  }, [listProductItens]);

  //Update the shipping price when the subtotal is updated
  useEffect(() => {
    setShipping(CartService.calcShipping(listProductItens, subTotal));
  }, [subTotal]);

  //Calcs the total when subtotal, shipping or discounts changes
  useEffect(() => {
    setTotal(subTotal + shipping);
    setTotalWithDiscounts(
      CartService.calcTotal(subTotal, shipping, totalDiscounts)
    );
  }, [subTotal, shipping, totalDiscounts]);

  //Calcs the discounts when a new voucher is applied, and when the prices are updated
  useEffect(() => {
    let pDiscounts = 0;
    let fDiscounts = 0;
    let sDiscounts = 0;
    let tDiscounts = 0;

    listAppliedVouchers.forEach((voucher) => {
      switch (voucher.type) {
        case "percentual":
          if (pDiscounts < 1) {
            let percent = voucher.amount / 100;
            pDiscounts = pDiscounts + subTotal * percent;
          }
          break;

        case "fixed":
          if (total >= voucher.amount) {
            fDiscounts = fDiscounts + voucher.amount;
          }
          break;

        case "shipping":
          if (subTotal >= voucher.minValue) {
            sDiscounts = shipping;
            let newShipping = shipping - sDiscounts;
            setShipping(newShipping);
          } else {
            setShipping(CartService.calcShipping(listProductItens, subTotal));
          }
          break;
      }
    });

    tDiscounts = pDiscounts + fDiscounts;
    setTotalDiscounts(tDiscounts);
  }, [listAppliedVouchers, listProductItens, subTotal]);

  function renderProductItem(product) {
    return (
      <div class="products-itens" key={product.id}>
        <ProductItem productData={product} />{" "}
      </div>
    );
  }

  return (
    <div className="Cart">
      <div class="card-cart">
        <div class="cart-header">
          <div class="cart-title">Shopping Cart</div>
        </div>

        <div class="cart-body">
          {listProductItens.length > 0 && 
            <div class="itens">{listProductItens.map(renderProductItem)}</div>
          }
          {listProductItens.length === 0 && 
            <div class="no-itens"> You have no items on your cart yet! Why not buy something?</div>
          }

          <div class="vouchers">
            <Vouchers />
          </div>

          <div class="prices">
            <span class="prices-text">Subtotal: </span>
            <span class="values"> $ {subTotal} </span>
            <hr></hr>
            <span class="prices-text">Shipping: </span>
            <span class="values"> $ {shipping} </span>
            <hr></hr>
            <span class="prices-text">Discounts: </span>
            <span class="values"> $ {totalDiscounts} </span>
            <hr></hr>
            <span class="prices-text">Total:</span>
            <span class="values"> $ {totalWithDiscounts} </span>
          </div>
        </div>
        <div class="cart-button">
          <button class="submit-button"> CHECKOUT </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
