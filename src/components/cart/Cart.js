import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import ProductItem from '../product-item/ProductItem.js';
import Vouchers from '../vouchers/Vouchers';
import { CartService } from '../../services/CartService';

import './Cart.css'


const Cart = (props) => {
    const listProductItens = useSelector(state => state.listProductsInCart);
    const listAppliedVouchers = useSelector(state => state.listAppliedVouchers);

    const [subTotal, setSubTotal] = useState(0); 
    const [shipping, setShipping] = useState(0);
    const [total, setTotal] = useState(0);
    const [totalWithDiscounts, setTotalWithDiscounts] = useState(0);

    const [totalDiscounts, setTotalDiscounts] = useState(0);

    useEffect(() => {
        setSubTotal(CartService.calcSubtotal(listProductItens));
    }, [listProductItens]);

    useEffect(() => {
        setShipping(CartService.calcShipping(listProductItens, subTotal));
    }, [subTotal]);

    useEffect(() => {
        setTotal(subTotal + shipping);
        setTotalWithDiscounts(CartService.calcTotal(subTotal, shipping, totalDiscounts));
    }, [subTotal, shipping, totalDiscounts]);

    useEffect(() => {
        let pDiscounts = 0;
        let fDiscounts = 0;
        let sDiscounts = 0;
        let tDiscounts = 0;

        listAppliedVouchers.forEach(voucher => {
            console.log("VOUCHERS", voucher);
            switch(voucher.type){
                case "percentual":
                    if(pDiscounts < 1){
                        let percent = voucher.amount / 100;
                        pDiscounts = pDiscounts + (subTotal * percent);
                    }
                    break;

                case "fixed":
                    console.log("TOTAL TOTALIZADO", total);
                    if(total >= voucher.amount){
                        fDiscounts = fDiscounts + voucher.amount;
                    }
                    break;

                case "shipping":
                    if(subTotal >= voucher.minValue){
                        sDiscounts = shipping;
                        let newShipping = shipping - sDiscounts;
                        setShipping(newShipping);
                    }
                    else{
                        setShipping(CartService.calcShipping(listProductItens, subTotal))
                    }
                   break;
            }
        });

        tDiscounts = pDiscounts + fDiscounts;
        console.log("DESCONTOS", pDiscounts, fDiscounts, tDiscounts);
        setTotalDiscounts(tDiscounts);
    }, [listAppliedVouchers, listProductItens, subTotal])

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
                    <div class="itens">
                        {listProductItens.map(renderProductItem)}
                    </div>

                    <div class="vouchers">
                        <Vouchers />
                    </div>

                    <div class="prices">
                        <div>Subtotal: {subTotal}</div>
                        <div>Shipping: {shipping}</div>
                        <div>Discount: {totalDiscounts}</div>
                        <div>Total: {totalWithDiscounts}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
  
export default Cart;