import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import "./Products.css";
import ProductCard from "../product-card/ProductCard";
import { ProductService } from "../../services/ProductService";

const Products = (props) => {
    const products = useSelector(state => state.listProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            await ProductService.getProducts().then(data => {
                if(data){
                    dispatch({type: 'SET_PRODUCTS', listProducts: data.products});
                }
                else{
                    console.log("Um erro ocorreu, não foi possível recuperar a lista de produtos.");
                    dispatch({type: 'SET_PRODUCTS', listProducts: []});
                }
                
            });
        }
        fetchData();
    }, []);

    function renderProducts(product){
        return <div class="products-itens" key={product.id}> <ProductCard productData={product} /> </div>
    };

    return (
        <div className="Products">
            <div class="products-grid">
                {products.map(renderProducts)}
            </div>
        </div>
    );

}

export default Products;
