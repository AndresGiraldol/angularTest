import { Injectable } from '@angular/core';
import { ProductsDataService } from './products-data.service';

@Injectable()
export class ProductsService {
  constructor(
    protected dataService: ProductsDataService,
  ) {
  }

  fetchAll() {
    return this.dataService.fetchAll();
  }
}
