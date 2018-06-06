export class AddToCart {
  static readonly type = '[Product List] Add to cart';
  constructor(public payload: { sku: string }) {}
}

export class RemoveFromCart {
  static readonly type = '[Product List] Remove from cart';
  constructor(public payload: { sku: string }) {}
}

export class EmptyCart {
  static readonly type = '[Cart] Empty cart';
}
