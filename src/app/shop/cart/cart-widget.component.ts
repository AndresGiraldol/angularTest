import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'cart-widget',
  template: `
    <div class="list-group">
      <div class="list-group-item" *ngFor="let item of items$ | async">
        <button class="close" (click)="cart.removeProduct(item.product)">&times;</button>
        <p>{{item.product.name}} x {{item.amount}}</p>
        <small>{{item.product.price}} x {{item.amount}} = {{item.subtotal}}</small>
      </div>
    </div>
    <div class="text-center p-4 mt-2">
      <h4>Total : {{ total$ | async }}</h4>
      <hr>
      <button class="btn">Checkout</button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CartWidgetComponent implements OnInit {
  items$;
  total$;

  constructor(
    public cart: CartService,
  ) {
    cart.fetchItems();

    this.items$ = cart.getCartUpdates();
    this.total$ = cart.getTotalUpdates();
  }

  ngOnInit() {
  }
}
