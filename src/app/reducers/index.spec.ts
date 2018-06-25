import {
  getProducts,
  getProductSkus,
  getCatalog,
  getCartItems,
  getAllCartSummary,
  getCartSummary,
  State,
} from './';
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

const createCatalogState = ({
  products = {
    'PRODUCT-AAA': createProduct({ sku: 'PRODUCT-AAA' }),
    'PRODUCT-BBB': createProduct({ sku: 'PRODUCT-BBB' }),
    'PRODUCT-CCC': createProduct({ sku: 'PRODUCT-CCC' }),
  },
  productSkus = ['PRODUCT-AAA', 'PRODUCT-BBB', 'PRODUCT-CCC'],
} = {}) => ({
  catalog: {
    products,
    productSkus,
  },
});

const createCartState = ({
  cartItems = {
    'PRODUCT-AAA': 3,
    'PRODUCT-CCC': 0,
  },
} = {}) => ({
  cart: {
    cartItems,
  },
});

const createState = ({
  catalog = createCatalogState(),
  cart = createCartState(),
} = {}): State => ({
  ...catalog,
  ...cart,
});

// step 1
test('getProducts', () => {
  const state = createCatalogState();
  expect(getProducts(state)).toBe(state.catalog.products);
});

test('getProductSkus', () => {
  const state = createCatalogState();
  expect(getProductSkus(state)).toBe(state.catalog.productSkus);
});

test('getCatalog', () => {
  const state = createCatalogState();
  expect(getCatalog(state).length).toBe(3);
});

test('getCartItems', () => {
  const state = createCartState();
  expect(getCartItems(state)).toBe(state.cart.cartItems);
});

test('getAllCartSummary', () => {
  const state = createState();
  expect(getAllCartSummary(state)).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        product: expect.objectContaining({
          sku: 'PRODUCT-AAA',
        }),
      }),
      expect.objectContaining({
        product: expect.objectContaining({
          sku: 'PRODUCT-CCC',
        }),
      }),
    ]),
  );
});

test('getCartSummary', () => {
  const state = createState();
  expect(getCartSummary(state)).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        product: expect.objectContaining({
          sku: 'PRODUCT-AAA',
        }),
      }),
    ]),
  );
});

// step 2
const testCases = [
  {
    name: 'getProducts',
    selector: getProducts,
    state: createCatalogState(),
  },
  {
    name: 'getProductSkus',
    selector: getProductSkus,
    state: createCatalogState(),
  },
  {
    name: 'getCatalog',
    selector: getCatalog,
    state: createCatalogState(),
  },
  {
    name: 'getCartItems',
    selector: getCartItems,
    state: createCartState(),
  },
  {
    name: 'getAllCartSummary',
    selector: getAllCartSummary,
    state: createState(),
  },
  {
    name: 'getCartSummary',
    selector: getCartSummary,
    state: createState(),
  },
];

testCases.forEach(({ name, state, selector }) => {
  test(`${name} with input ${JSON.stringify(state)}`, () => {
    expect(selector(state)).toMatchSnapshot();
  });
});

// step 3
test('getCartSummary only shows products with an amount', () => {
  const cartItems: CartItem[] = [
    {
      amount: 1,
      product: createProduct({ sku: 'foo' }),
    },
    {
      amount: 0,
      product: createProduct({ sku: 'bar' }),
    },
    {
      amount: 2,
      product: createProduct({ sku: 'baz' }),
    },
  ];

  expect(getCartSummary.projector(cartItems)).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        product: expect.objectContaining({
          sku: 'foo',
        }),
      }),
      expect.objectContaining({
        product: expect.objectContaining({
          sku: 'baz',
        }),
      }),
    ]),
  );
});
