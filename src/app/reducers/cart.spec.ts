import { State, getCartItems } from './cart';
import { Product, CartItem } from '../models/index';

const createState = (): State => ({
  cartItems: {
    'PRODUCT-AAA': 3,
    'PRODUCT-CCC': 0,
  },
});

test('getCartItems', () => {
  const state = createState();
  expect(getCartItems(state)).toBe(state.cartItems);
});
