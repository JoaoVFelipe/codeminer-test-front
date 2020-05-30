import React, {useState, useEffect} from "react";
import "./Products.css";
import ProductCard from "../product-card/ProductCard";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // const data =  await ProductService.getAllProducts();
        // setProducts(data);
    }, []);

    function renderProducts(product){
        return <div class="products-itens"> <ProductCard productData={product} /> </div>
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
