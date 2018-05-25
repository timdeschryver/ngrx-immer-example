import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromCatalog from './catalog.reducer';
import * as fromCart from './cart.reducer';
import { CartItem } from '../models';

export interface State {
  catalog: fromCatalog.State;
  cart: fromCart.State;
}

export const reducers: ActionReducerMap<State> = {
  catalog: fromCatalog.reducer,
  cart: fromCart.reducer,
};

export const getCatalogState = createFeatureSelector<fromCatalog.State>('catalog');
export const getProducts = createSelector(getCatalogState, fromCatalog.getProducts);
export const getProductSkus = createSelector(getCatalogState, fromCatalog.getProductSkus);
export const getCatalog = createSelector(getProductSkus, getProducts, (skus, products) =>
  skus.map(sku => products[sku]),
);

export const getCartState = createFeatureSelector<fromCart.State>('cart');
export const getCartItems = createSelector(getCartState, fromCart.getCartItems);

export const getAllCartSummary = createSelector(getProducts, getCartItems, (products, cart): CartItem[] =>
  Object.keys(cart).map(sku => ({
    product: products[sku],
    amount: cart[sku],
  })),
);
export const getCartSummary = createSelector(getAllCartSummary, cart => cart.filter(item => item.amount > 0));
