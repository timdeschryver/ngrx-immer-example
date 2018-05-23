export interface Product {
  name: string;
  sku: string;
  price: number;
  image: string;
}

export interface CartItem {
  product: Product;
  amount: number;
}
