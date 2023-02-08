import { CartDataService } from './cart-data.service';
import { Injectable } from '@angular/core';
import { CartItem } from './cart-item.interface';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

interface CartState {
  items: CartItemsMap;
  order: number[];
  total: number;
}

interface CartItemsMap {
  [id: number]: CartItem;
}

@Injectable()
export class CartService {
  protected _lastState = {
    items: {},
    order: [],
    total: 0,
  };

  protected _state = new BehaviorSubject<CartState>(this._lastState);
  protected _updates = new Subject<CartItem>();

  constructor(protected dataService: CartDataService) {
    this._updates.subscribe((item) => {
      const itemId = item.id;
      const { order, items } = this.getState();
      let index = order.findIndex((id) => id === item.id);

      if (index === -1) {
        index = order.length;
        order[index] = itemId;
        items[itemId] = item;
      }

      if (item.amount <= 0) {
        order.splice(index, 1);
        delete items[itemId];
      }

      this._lastState = {
        order,
        items,
        total: this.calculateTotal(order.map((id) => items[id])),
      };
      this._state.next(this._lastState);
    });
  }

  fetchItems() {
    this.dataService.fetchAll().subscribe((items) => {
      items.forEach((item) => this.notifyItemChanged(item));
    });
  }

  protected calculateTotal(items: CartItem[]) {
    return items.reduce((total, item) => total += item.subtotal, 0);
  }

  protected calculateSubtotal(item: CartItem) {
    item.subtotal = item.product.price * item.amount;
    return item;
  }

  protected updateItem(item: CartItem) {
    item = this.calculateSubtotal(item);

    let request: Observable<CartItem>;
    if (item.amount <= 0) {
      request = this.dataService.remove(item);
    } else {
      request = this.dataService.persist(item);
    }
    this.notifyItemChanged(item);

    request.subscribe(() => {
      // this.fetchItems();
    });
  }

  protected notifyItemChanged(item) {
    this._updates.next(item);
  }

  addProduct(product) {
    const id = product.id;
    let item = this.getItem(id);

    if (!item) {
      item = {
        id,
        product,
        amount: 1,
        subtotal: 0,
      };
    } else {
      item.amount += 1;
    }
    this.updateItem(item);
  }

  removeProduct(product) {
    const id = product.id;
    const item = this.getItem(id);

    if (!item) {
      return void 0;
    }
    item.amount--;

    this.updateItem(item);
  }

  protected getState() {
    return this._lastState;
  }

  getItems() {
    return this.getState().order.map((id) => this.getItem(id));
  }

  getItem(id) {
    return this.getState().items[id];
  }

  getTotal() {
    return this.getState().total;
  }

  getCartUpdates() {
    return this._state.pipe(map(() => this.getItems()));
  }

  getItemUpdates(id) {
    return this._state.pipe(map(({ items }) => items[id]));
  }

  getTotalUpdates() {
    return this._state.pipe(map((s) => s.total));
  }
}
