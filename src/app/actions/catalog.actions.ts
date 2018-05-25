import { Action } from '@ngrx/store';
import { Product } from '../models';

export enum CatalogActionTypes {
  Load = "[Catalog 'API'] Load",
}

export class LoadCatalog implements Action {
  readonly type = CatalogActionTypes.Load;
  constructor(public payload: { products: Product[] }) {}
}

export type CatalogActions = LoadCatalog;
