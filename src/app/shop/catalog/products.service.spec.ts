import { TestBed, inject } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { Product } from './product.interface';
import { ProductsDataService } from './products-data.service';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let dataservice: ProductsDataService;
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
        { provide: ProductsDataService, useValue: dataservice },
        ProductsService
      ]
    });
  });

  beforeEach(inject([ProductsService], (service: ProductsService) => {
    productsService = service;
  }));

  it('should be created', inject([ProductsService], (service: ProductsService) => {
    expect(service).toBeTruthy();
  }));

  it('can fetch all products', () => {
    productsService.fetchAll();
    expect(dataservice.fetchAll).toHaveBeenCalled();
  });
});
