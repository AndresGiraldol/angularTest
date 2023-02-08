import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductsService } from './shop/catalog/products.service';
import { Observable } from 'rxjs';
import { Product } from './shop/catalog/product.interface';

@Component({
  selector: 'home-page',
  template: `
  <div class="row">
    <div class="col">
      <products-list [products]="products$ |async">

        <ng-container *forProduct="let product ofType 'promo'">
          <div class="product-image"></div>
          <h4>{{product.name}}</h4>
          <cart-item-control class="float-right" [product]="product"></cart-item-control>
        </ng-container>

      </products-list>
    </div>
    <div class="col-3">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">In Cart</h4>
        </div>
        <cart-widget></cart-widget>
      </div>
    </div>
  </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomePageComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(
    public products: ProductsService,
  ) {
    this.products$ = this.products.fetchAll();
  }

  ngOnInit() {
  }
}
