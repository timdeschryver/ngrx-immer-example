import { State, getProducts, getProductSkus } from './catalog';
import { Product, CartItem } from '../models/index';

const createProduct = ({
  sku = '',
  name = '',
  image = '',
  price = 1,
} = {}): Product => ({
  sku: sku,
  name: name || `name-${sku}`,
  price,
  image: image || `image-${sku}`,
});

const createState = () => ({
  products: {
    'PRODUCT-AAA': createProduct({ sku: 'PRODUCT-AAA' }),
    'PRODUCT-BBB': createProduct({ sku: 'PRODUCT-BBB' }),
    'PRODUCT-CCC': createProduct({ sku: 'PRODUCT-CCC' }),
  },
  productSkus: ['PRODUCT-AAA', 'PRODUCT-BBB', 'PRODUCT-CCC'],
});

test('getProducts', () => {
  const state = createState();
  expect(getProducts(state)).toBe(state.products);
});

test('getProductSkus', () => {
  const state = createState();
  expect(getProductSkus(state)).toBe(state.productSkus);
});
