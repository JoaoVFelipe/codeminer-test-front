class CartService {

  //Calcs the subtotal based on the list of products
  calcSubtotal(productsItemList) {
    let subTotal = 0;
    //For each product, adds the price*quantity
    productsItemList.map((product) => {
      subTotal = subTotal + product.price * product.quantity;
      return subTotal;
    });
    return subTotal;
  }

  //Calcs the shiping based on the list of products and the subtotal
  calcShipping(productsItemList, subTotal) {
    let shippingPrice = 0;
    let totalKg = 0;
    //Calcs the total in kgs (or itens)
    productsItemList.map((product) => {
      totalKg = totalKg + product.quantity;
    });

    //If subtotal > 400, SHIPPING IS FREE!
    if (subTotal > 400) {
      shippingPrice = 0;
    } 
    
    //Ifs not, calcs the shipping based on price
    else if (totalKg > 0) {
      shippingPrice = 30;
      //If it have more than 10kgs
      if (totalKg > 10) {
        totalKg = totalKg - 10;
        //For each 5 extra kgs, add 7 to the shipping
        while (totalKg >= 5) {
          shippingPrice = shippingPrice + 7;
          totalKg = totalKg - 5;
        }
      }
    }
    return shippingPrice;
  }

  //Calcs the total
  calcTotal(subTotal, shipping, totalDiscounts) {
    return subTotal + shipping - totalDiscounts;
  }
}

const instance = new CartService();
export { instance as CartService };
