import { State, Selector, Action, StateContext } from '@ngxs/store';
import { CatalogStateModel } from './catalog.models';
import { LoadCatalog } from './catalog.actions';

@State<CatalogStateModel>({
  name: 'catalog',
  defaults: {
    products: {},
    productSkus: [],
  },
})
export class CatalogState {
  @Selector()
  static catalog(state: CatalogStateModel) {
    return state.productSkus.map(sku => state.products[sku]);
  }

  @Action(LoadCatalog)
  loadCatalog(ctx: StateContext<CatalogStateModel>, action: LoadCatalog) {
    ctx.setState({
      products: action.payload.products.reduce((obj, product) => {
        obj[product.sku] = product;
        return obj;
      }, {}),
      productSkus: action.payload.products.map(product => product.sku),
    });
  }
}
