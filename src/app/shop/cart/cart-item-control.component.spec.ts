import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CartItemControlComponent } from './cart-item-control.component';
import { CartService } from './cart.service';
import { Subject } from 'rxjs';
import { Product } from '../catalog/product.interface';

describe('CartItemControlComponent', () => {
  let component: CartItemControlComponent;
  let fixture: ComponentFixture<CartItemControlComponent>;
  let ServiceMock: CartService;
  let MockProduct: Product;

  beforeEach(waitForAsync(() => {
    MockProduct = {
      id: 123,
      name: 'Mock Product',
      price: 100,
    };

    ServiceMock = jasmine.createSpyObj('CartServiceMock', {
      getCartUpdates: new Subject(),
      getItemUpdates: new Subject(),
      getTotalUpdates: new Subject(),
      fetchItems: void 0,
    });

    TestBed.configureTestingModule({
      declarations: [ CartItemControlComponent ],
      providers: [
        { provide: CartService, useValue: ServiceMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemControlComponent);
    fixture.componentInstance.product = MockProduct;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have one subscription for product cart item', waitForAsync(() => {
    const mockSubject = ServiceMock.getItemUpdates(MockProduct);

    component.ngOnInit();
    fixture.detectChanges();

    expect(mockSubject['observers'].length).toEqual(1);
  }));

  it('should unsubscribe when component is destroyed', waitForAsync(() => {
    const mockSubject = ServiceMock.getItemUpdates(MockProduct);
    fixture.destroy();

    expect(mockSubject['observers'].length).toEqual(0);
  }));
});
