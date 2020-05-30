import {createStore} from 'redux';

const INITIAL_STATE = {
    listProducts: [],
    listProductsInCart: [],
};

function buyProduct(state = INITIAL_STATE, action){
    switch (action.type){
        case 'SET_PRODUCTS':
            return { ...state, listProducts: [...action.listProducts]};

        case 'UPDATE_AMMOUNT_ADD_TO_CART':
            if(action.product.available > 0){
                state.listProductsInCart = state.listProductsInCart.map(
                    (product) => product.id === action.product.id ? {...product, quantity: product.quantity + 1}: product
                );
             
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
            
        case 'ADD_TO_CART':
            action.product.quantity = 0;
            return{ ...state, listProductsInCart: [...state.listProductsInCart, action.product]};
        
        case 'REMOVE_FROM_CART':
            return {...state, listProductsInCart: state.listProductsInCart.filter((elem, index) => elem.id !== action.product.id)};

        default:
            return state;
    }
}

const store = createStore(buyProduct);
export default store;