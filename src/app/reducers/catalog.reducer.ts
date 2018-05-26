import { Action } from '@ngrx/store';
import produce from 'immer';
import { Product } from '../models';
import { CatalogActions, CatalogActionTypes } from '../actions/catalog.actions';

export interface State {
  products: { [sku: string]: Product };
  productSkus: string[];
}

export const initialState: State = {
  products: {},
  productSkus: [],
};

export const reducer = produce<State, CatalogActions>((draft, action) => {
  switch (action.type) {
    case CatalogActionTypes.Load:
      action.payload.products.forEach(product => {
        draft.products[product.sku] = product;
        draft.productSkus.push(product.sku);
      });
  }
}, initialState);

export const getProducts = (state: State) => state.products;
export const getProductSkus = (state: State) => state.productSkus;
