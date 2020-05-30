import React, {useState, useEffect} from "react";
import "./Products.css";
import ProductCard from "../product-card/ProductCard";
import { ProductService } from "../../services/ProductService";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setProducts(await ProductService.getProducts());
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
