import { Injectable } from '@angular/core';
import { BaseDataService } from '../base-data.service';
import { Product } from './product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductsDataService extends BaseDataService<Product> {
  API_URL = 'http://localhost/api/products/';

  constructor(
    protected _http: HttpClient,
  ) {
    super(_http);
  }
}
