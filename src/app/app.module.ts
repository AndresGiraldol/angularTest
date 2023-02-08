import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryBackendService } from './in-memory-backend-service'

import { AppComponent } from './app.component';
import { HomePageComponent } from './home.component';
import { ProductsListComponent } from './shop/products-list.component';
import { ProductsService } from './shop/catalog/products.service';
import { ProductsDataService } from './shop/catalog/products-data.service';
import { CartWidgetComponent } from './shop/cart/cart-widget.component';
import { CartDataService } from './shop/cart/cart-data.service';
import { CartService } from './shop/cart/cart.service';
import { CartItemControlComponent } from './shop/cart/cart-item-control.component';
import { ForProductDirective } from './shop/catalog/for-product.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductsListComponent,
    CartWidgetComponent,
    CartItemControlComponent,
    ForProductDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryBackendService),
  ],
  providers: [
    ProductsDataService,
    ProductsService,
    CartDataService,
    CartService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
