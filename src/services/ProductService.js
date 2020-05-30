class ProductService{

    async getProducts(){
        const response = await fetch('https://shielded-wildwood-82973.herokuapp.com/products.json');
        if(!response.ok){
            return null;
        }
        const json = await response.json();
        return json;
    }
}

const instance = new ProductService();
export { instance as ProductService };