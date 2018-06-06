import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Product, CartItem } from '../../models';
import { CatalogStateModel, CatalogState } from '../catalog';
import { CartStateModel } from './cart.models';
import { AddToCart, RemoveFromCart, EmptyCart } from './cart.actions';

@State<CartStateModel>({
  name: 'cartItems',
  defaults: {
    cartItems: {},
  },
})
export class CartState {
  @Selector([CatalogState])
  static cartItems(state: CartStateModel, catalogState: CatalogStateModel): CartItem[] {
    return Object.keys(state.cartItems)
      .filter(p => state.cartItems[p])
      .map(sku => ({
        product: catalogState.products[sku],
        amount: state.cartItems[sku],
      }));
  }

  @Action(AddToCart)
  addProduct(ctx: StateContext<CartStateModel>, action: AddToCart) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      cartItems: {
        ...state.cartItems,
        [action.payload.sku]: (state.cartItems[action.payload.sku] || 0) + 1,
      },
    });
  }

  @Action(RemoveFromCart)
  removeProduct(ctx: StateContext<CartStateModel>, action: RemoveFromCart) {
    const state = ctx.getState();
    ctx.patchState({
      cartItems: {
        ...state.cartItems,
        [action.payload.sku]: Math.max((state.cartItems[action.payload.sku] || 0) - 1, 0),
      },
    });
  }

  @Action(EmptyCart)
  emptyCart(ctx: StateContext<CartStateModel>, action: EmptyCart) {
    ctx.setState({ cartItems: {} });
  }
}
