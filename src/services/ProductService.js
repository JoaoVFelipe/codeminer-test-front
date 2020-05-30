class ProductService{

    async getProducts(){
        const response = await fetch('https://shielded-wildwood-82973.herokuapp.com/products.json');
        const json = await response.json();
        return json.products;
    }

}

const instance = new ProductService();

export { instance as ProductService };