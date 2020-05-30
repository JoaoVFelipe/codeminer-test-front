class ProductService {

    async getAllProducts(){
        fetch('https://shielded-wildwood-82973.herokuapp.com/products.json')
            .then(res => res.json())
                .then((data) => {
                    console.log("PRODUCTS", data);
                    return data.products;
                })
                 .catch((err) => {
                    console.log("error", err);
                    return null;
                });
    }
}    

const instance = new ProductService();
export { instance as ProductService };