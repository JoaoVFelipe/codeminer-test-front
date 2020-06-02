class CartService {
  calcSubtotal(productsItemList) {
    let subTotal = 0;
    productsItemList.map((product) => {
      subTotal = subTotal + product.price * product.quantity;
      return subTotal;
    });
    return subTotal;
  }

  calcShipping(productsItemList, subTotal) {
    let shippingPrice = 0;
    let totalKg = 0;
    productsItemList.map((product) => {
      totalKg = totalKg + product.quantity;
    });

    if (subTotal > 400) {
      shippingPrice = 0;
    } else if (totalKg > 0) {
      shippingPrice = 30;
      if (totalKg > 10) {
        totalKg = totalKg - 10;
        while (totalKg >= 5) {
          shippingPrice = shippingPrice + 7;
          totalKg = totalKg - 5;
        }
      }
    }
    return shippingPrice;
  }

  calcTotal(subTotal, shipping, totalDiscounts) {
    return subTotal + shipping - totalDiscounts;
  }
}

const instance = new CartService();
export { instance as CartService };
