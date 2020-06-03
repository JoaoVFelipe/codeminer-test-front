import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import "./Products.css";
import ProductCard from "../product-card/ProductCard";
import { ProductService } from "../../services/ProductService";

const Products = (props) => {
    const products = useSelector(state => state.listProducts);
    const [loadedWithoutErrors, setLoadedWithoutErrors] = useState(true);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData();
    }, []);

    //Get products from API
    async function fetchData() {
        setLoading(true);
        setLoadedWithoutErrors(true);
        await ProductService.getProducts().then(data => {
            if(data){
                dispatch({type: 'SET_PRODUCTS', listProducts: data.products});
                setLoading(false);
            }
            else{
                dispatch({type: 'SET_PRODUCTS', listProducts: []});
                setLoadedWithoutErrors(false);
                setLoading(false);
            }
        });
    }

    //Render product cards
    function renderProducts(product){
        return <div class="products-itens" key={product.id}> <ProductCard productData={product} /> </div>
    };

    return (
        <div className="Products">
            {loading && 
                <div class="loader"></div>
            }
            {
                loadedWithoutErrors && 
                <div class="products-grid"> 
                    {products.map(renderProducts)}
                </div>
            }
            {
                !loadedWithoutErrors && 
                <div class="retry-reload">
                    <div class="error-text">
                        An error ocurred. We aren't able to get the products list :(
                    </div>
                    <button class="try-again" onClick={fetchData}> Try Again! </button>
                </div> 
            }

            
        </div>
    );

}

export default Products;
