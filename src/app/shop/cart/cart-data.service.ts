import { HttpClient } from '@angular/common/http';
import { BaseDataService } from '../base-data.service';
import { Injectable } from '@angular/core';
import { CartItem } from './cart-item.interface';

@Injectable()
export class CartDataService extends BaseDataService<CartItem> {
  API_URL = 'http://localhost/api/cart/';

  constructor(
    protected _http: HttpClient,
  ) {
    super(_http);
  }

  persist(item: CartItem) {
    // For simplicity give cart item same id as product
    item.id = item.id || item.product.id;

    if (item.amount <= 0) {
      return super.remove(item);
    } else {
      return super.persist(item);
    }
  }
}
