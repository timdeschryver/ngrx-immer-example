import { State, Selector, Action, StateContext } from '@ngxs/store';
import produce from 'immer';
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
    ctx.setState(
      produce(ctx.getState(), draft => {
        action.payload.products.forEach(product => {
          draft.products[product.sku] = product;
          draft.productSkus.push(product.sku);
        });
      }),
    );
  }
}
