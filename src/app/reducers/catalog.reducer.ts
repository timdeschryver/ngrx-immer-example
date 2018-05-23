import { Action } from '@ngrx/store';
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

export function reducer(state = initialState, action: CatalogActions) {
  switch (action.type) {
    case CatalogActionTypes.Load:
      return {
        ...state,
        products: action.payload.products.reduce((obj, product) => {
          obj[product.sku] = product;
          return obj;
        }, {}),
        productSkus: action.payload.products.map(product => product.sku),
      };

    default:
      return state;
  }
}

export const getProducts = (state: State) => state.products;
export const getProductSkus = (state: State) => state.productSkus;
