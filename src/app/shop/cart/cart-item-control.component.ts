import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { Product } from '../catalog/product.interface';
import { CartService } from './cart.service';
import { CartItem } from './cart-item.interface';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cart-item-control',
  template: `
    <span *ngIf="item$ | async as item; else notInCart">
      <button (click)="cart.removeProduct(product)">-</button>
      <input disabled [value]="item.amount">
      <button (click)="cart.addProduct(product)">+</button>
    </span>
    <ng-template #notInCart>
      <button (click)="cart.addProduct(product)">Add to Cart</button>
    </ng-template>
  `,
  styles: [`
    input {
      width: 2.5em;
      text-align: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CartItemControlComponent implements OnInit, OnDestroy {
  @Input()
  product: Product;

  item$: Observable<CartItem>;

  private subscription: Subscription;

  constructor(
    public cart: CartService,
  ) {
  }

  ngOnInit() {
    this.item$ = this.cart.getItemUpdates(this.product.id);
    if (!this.subscription || this.subscription.closed) {
      this.subscription = this.item$.subscribe();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
