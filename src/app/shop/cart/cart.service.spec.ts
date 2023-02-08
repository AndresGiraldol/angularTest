import { CartDataService } from './cart-data.service';
import { CartItem } from './cart-item.interface';
import { TestBed, inject } from '@angular/core/testing';

import { CartService } from './cart.service';
import { Subject } from 'rxjs';

import { buffer } from 'rxjs/operators';

describe('CartService', () => {
  let cart: CartService;
  let dataservice: CartDataService;
  const product_A = { id: 123, price: 100 };
  const product_B = { id: 124, price: 150 };
  const fakeObservable = { subscribe: () => {} };

  beforeEach(() => {
    dataservice = jasmine.createSpyObj('data service', {
      persist: fakeObservable,
      remove: fakeObservable,
      fetchAll: fakeObservable,
      fetchOne: fakeObservable,
    });

    TestBed.configureTestingModule({
      providers: [
        { provide: CartDataService, useValue: dataservice },
        CartService
      ]
    });
  });

  beforeEach(inject([CartService], (service: CartService) => {
    cart = service;
  }));

  // it('should be created', inject([CartService], (service: CartService) => { }));

  // it('can add product to cart', () => {})

  // it('can remove product from cart', () => {})

  // it('aggregate same products as one item, tracks amount', () => {})

  // it('calculates subtotal item cost per amount', () => {})

  // it('calculates total item cost per amount', () => {})

  // it('persists all changes to API', () => { })

  it('notifies subscribers on cart item changes', () => {
    const notifications = new Subject();
    let update;

    cart.getItemUpdates(product_A.id)
      .pipe(buffer(notifications))
      .subscribe(u => {
        update = u.pop();
      });

    cart.addProduct(product_A);
    notifications.next(null);
    expect(update.amount).toEqual(1);
    expect(update.subtotal).toEqual(product_A.price);

    cart.addProduct(product_A);
    expect(update.amount).toEqual(2);
    expect(update.subtotal).toEqual(product_A.price * 2);

    cart.removeProduct(product_A);
    expect(update.amount).toEqual(1);
    expect(update.subtotal).toEqual(product_A.price);

    cart.removeProduct(product_A);
    expect(update.amount).toEqual(0);
    expect(update.subtotal).toEqual(0);
  });

  it('notifies with most recent cart state imediately on subscription', () => {
    let update = { amount: 0 };

    cart.addProduct(product_A);
    cart.addProduct(product_A);

    cart.getItemUpdates(product_A.id)
      .subscribe(u => {
        update = u;
      });

    expect(update.amount).toEqual(2);
  });
});
