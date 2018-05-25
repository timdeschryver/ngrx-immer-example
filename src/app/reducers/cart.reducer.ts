import { Action } from '@ngrx/store';
import produce from 'immer';
import { CartActionTypes, CartActions } from '../actions/cart.actions';

export interface State {
  cartItems: { [sku: string]: number };
}

export const initialState: State = {
  cartItems: {},
};

export const reducer = produce((draft, action: CartActions) => {
  switch (action.type) {
    case CartActionTypes.AddToCart:
      draft.cartItems[action.payload.sku] = (draft.cartItems[action.payload.sku] || 0) + 1;
      return;

    case CartActionTypes.RemoveFromCart:
      const newAmount = draft.cartItems[action.payload.sku] - 1;
      if (newAmount > 0) {
        draft.cartItems[action.payload.sku] = newAmount;
        return;
      }
      delete draft.cartItems[action.payload.sku];
      // or
      // draft.cartItems[action.payload.sku] = Math.max((draft.cartItems[action.payload.sku] || 0) - 1, 0);
      return;

    case CartActionTypes.EmptyCart:
      return initialState;
  }
}, initialState);

export const getCartItems = (state: State) => state.cartItems;
