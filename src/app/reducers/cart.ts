import { Action } from '@ngrx/store';
import { CartActionTypes, CartActions } from '../actions/cart.actions';

export interface State {
  cartItems: { [sku: string]: number };
}

export const initialState: State = {
  cartItems: {},
};

export function reducer(state = initialState, action: CartActions) {
  switch (action.type) {
    case CartActionTypes.AddToCart:
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [action.payload.sku]: (state.cartItems[action.payload.sku] || 0) + 1,
        },
      };

    case CartActionTypes.RemoveFromCart:
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [action.payload.sku]: Math.max((state.cartItems[action.payload.sku] || 0) - 1, 0),
        },
      };

    case CartActionTypes.EmptyCart:
      return initialState;

    default:
      return state;
  }
}

export const getCartItems = (state: State) => state.cartItems;
