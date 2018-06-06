import { Product } from '../../models';

export interface CatalogStateModel {
  products: { [sku: string]: Product };
  productSkus: string[];
}
