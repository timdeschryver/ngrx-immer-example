import { Action } from '@ngrx/store';
import produce from 'immer';
import { CartActionTypes, CartActions } from '../actions/cart.actions';

export interface State {
  cartItems: { [sku: string]: number };
}

export const initialState: State = {
  cartItems: {},
};

export function reducer(state = initialState, action: Action) {
  return produce((draft, cartAction) => {
    switch (cartAction.type) {
      case CartActionTypes.AddToCart:
        draft.cartItems[cartAction.payload.sku] = (draft.cartItems[cartAction.payload.sku] || 0) + 1;
        return;

      case CartActionTypes.RemoveFromCart:
        const newAmount = draft.cartItems[cartAction.payload.sku] - 1;
        if (newAmount > 0) {
          draft.cartItems[cartAction.payload.sku] = newAmount;
          return;
        }
        delete draft.cartItems[cartAction.payload.sku];
        // or
        // draft.cartItems[cartAction.payload.sku] = Math.max((draft.cartItems[cartAction.payload.sku] || 0) - 1, 0);
        return;

      case CartActionTypes.EmptyCart:
        return initialState;
    }
  }, initialState)(state, action as CartActions);
}

export const getCartItems = (state: State) => state.cartItems;
