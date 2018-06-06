import { Product } from '../../models';

export class LoadCatalog {
  static readonly type = "[Catalog 'API'] Load catalog";
  constructor(public payload: { products: Product[] }) {}
}
