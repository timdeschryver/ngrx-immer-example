import { getProducts, getProductSkus, getCatalog, getCartItems, getAllCartSummary, getCartSummary, State } from './';
import { Product, CartItem } from '../models/index';

const createProduct = ({ sku = '', name = '', image = '', price = 1 } = {}): Product => ({
  sku: sku,
  name: name || `name-${sku}`,
  price,
  image: image || `image-${sku}`,
});

const createState = ({
  catalog = {
    products: {
      'PRODUCT-AAA': createProduct({ sku: 'PRODUCT-AAA' }),
      'PRODUCT-BBB': createProduct({ sku: 'PRODUCT-BBB' }),
      'PRODUCT-CCC': createProduct({ sku: 'PRODUCT-CCC' }),
    },
    productSkus: ['PRODUCT-AAA', 'PRODUCT-BBB', 'PRODUCT-CCC'],
  },
  cart = {
    cartItems: {
      'PRODUCT-AAA': 3,
      'PRODUCT-CCC': 0,
    },
  },
} = {}): State => ({
  catalog,
  cart,
});

// step 1
test('getProducts', () => {
  expect(Object.keys(getProducts(createState())).length).toEqual(3);
});

test('getProductSkus', () => {
  expect(getProductSkus(createState()).length).toBe(3);
});

test('getCatalog', () => {
  expect(getCatalog(createState()).length).toBe(3);
});

test('getCartItems', () => {
  expect(Object.keys(getCartItems(createState())).length).toBe(2);
});

test('getAllCartSummary', () => {
  expect(getAllCartSummary(createState()).length).toBe(2);
});

test('getCartSummary', () => {
  expect(getCartSummary(createState()).length).toBe(1);
});

// step 2
const fixtures = [
  {
    name: 'getProducts',
    selector: getProducts,
    state: createState(),
  },
  {
    name: 'getProductSkus',
    selector: getProductSkus,
    state: createState(),
  },
  {
    name: 'getCatalog',
    selector: getCatalog,
    state: createState(),
  },
  {
    name: 'getCartItems',
    selector: getCartItems,
    state: createState(),
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

fixtures.forEach(fixture => {
  test(fixture.name, () => {
    expect(fixture.selector(fixture.state)).toMatchSnapshot();
  });
});

// step 3
test('getCartSummary with projector', () => {
  const cartItems: CartItem[] = [
    {
      amount: 1,
      product: createProduct(),
    },
    {
      amount: 0,
      product: createProduct(),
    },
    {
      amount: 2,
      product: createProduct(),
    },
  ];

  expect(getCartSummary.projector(cartItems).length).toBe(2);
});
