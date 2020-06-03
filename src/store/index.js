import {createStore} from 'redux';
import _ from 'lodash';

const INITIAL_STATE = {
    listProducts: [],
    listProductsInCart: [],
    listAppliedVouchers: [],
};


function buyProduct(state = INITIAL_STATE, action){
    switch (action.type){
        //Action to set products on the state.listProducts
        case 'SET_PRODUCTS':
            return { ...state, listProducts: [...action.listProducts]};

        //Action to update the ammount of items of a product already added in the cart
        case 'UPDATE_AMMOUNT_ADD_TO_CART':
            //Gets the product
            let product = _.find(state.listProducts, {'id': action.product.id});

            //If it still available
            if(product.available > 0){
                //Adds one in the quantity on cart
                state.listProductsInCart = state.listProductsInCart.map(
                    (product) => product.id === action.product.id ? {...product, quantity: product.quantity + 1}: product
                );

                //Removes one from the ammount available
                return { ...state, 
                            listProducts: state.listProducts.map(
                                    (product) => product.id === action.product.id ? {...product, available: product.available - 1}
                                                : product
                    )
                }
            }
            else{
                 return state;
            }
        
        //Action to update the ammount of an product in cart, removing an item
        case 'UPDATE_AMMOUNT_REMOVE_FROM_CART':
            if (action.product.quantity > 0){
                state.listProductsInCart = state.listProductsInCart.map(
                    (product) => product.id === action.product.id ? {...product, quantity: product.quantity - 1} : product
                );
             
                return { ...state, listProducts: state.listProducts.map(
                            (product) => product.id === action.product.id ? {...product, available: product.available + 1} : product
                    )
                }
            }
            else {
                return state;
            }
        
        //Add product to cart
        case 'ADD_TO_CART':
            action.product.quantity = 0;
            return{ ...state, listProductsInCart: [...state.listProductsInCart, action.product]};
        
        //Removes products from cart
        case 'REMOVE_FROM_CART':
            return {...state, listProductsInCart: state.listProductsInCart.filter((elem, index) => elem.id !== action.product.id)};

        //Adds an voucher to the list of applied vouchers
        case 'APPLY_VOUCHER':
            return{ ...state, listAppliedVouchers: [...state.listAppliedVouchers, action.voucher]};
        
        //Removes the voucher from the list
        case 'REMOVE_VOUCHER':
            return{ ...state, listAppliedVouchers: state.listAppliedVouchers.filter((elem, index) => elem.id !== action.voucher.id)};
    
        default:
            return state;
    }
}

const store = createStore(buyProduct);
export default store;