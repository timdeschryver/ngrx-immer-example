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

export function reducer(state = initialState, action: Action) {
  return produce((draft, catalogAction) => {
    switch (catalogAction.type) {
      case CatalogActionTypes.Load:
        catalogAction.payload.products.forEach(product => {
          draft.products[product.sku] = product;
          draft.productSkus.push(product.sku);
        });
    }
  })(state, action as CatalogActions);
}

export const getProducts = (state: State) => state.products;
export const getProductSkus = (state: State) => state.productSkus;
