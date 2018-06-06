import { State, Selector, Action, StateContext } from '@ngxs/store';
import produce from 'immer';
import { Product, CartItem } from '../../models';
import { CatalogStateModel, CatalogState } from '../catalog';
import { CartStateModel } from './cart.models';
import { AddToCart, RemoveFromCart, EmptyCart } from './cart.actions';

export const initialState: CartStateModel = {
  cartItems: {},
};

@State<CartStateModel>({
  name: 'cartItems',
  defaults: initialState,
})
export class CartState {
  @Selector([CatalogState])
  static cartItems(state: CartStateModel, catalogState: CatalogStateModel): CartItem[] {
    return Object.keys(state.cartItems).map(sku => ({
      product: catalogState.products[sku],
      amount: state.cartItems[sku],
    }));
  }

  @Action(AddToCart)
  addProduct(ctx: StateContext<CartStateModel>, action: AddToCart) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.cartItems[action.payload.sku] = (draft.cartItems[action.payload.sku] || 0) + 1;
      }),
    );
  }

  @Action(RemoveFromCart)
  removeProduct(ctx: StateContext<CartStateModel>, action: RemoveFromCart) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        const newAmount = draft.cartItems[action.payload.sku] - 1;
        if (newAmount > 0) {
          draft.cartItems[action.payload.sku] = newAmount;
          return;
        }
        delete draft.cartItems[action.payload.sku];
      }),
    );
  }

  @Action(EmptyCart)
  emptyCart(ctx: StateContext<CartStateModel>, action: EmptyCart) {
    ctx.setState(
      produce(ctx.getState(), draft => {
        return initialState;
      }),
    );
  }
}
