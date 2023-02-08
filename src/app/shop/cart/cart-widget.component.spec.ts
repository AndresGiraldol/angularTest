import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CartWidgetComponent } from './cart-widget.component';
import { CartService } from './cart.service';
import { Subject } from 'rxjs';

describe('CartWidgetComponent', () => {
  let component: CartWidgetComponent;
  let fixture: ComponentFixture<CartWidgetComponent>;
  let ServiceMock: CartService;

  beforeEach(waitForAsync(() => {
    ServiceMock = jasmine.createSpyObj('CartServiceMock',{
      getCartUpdates: new Subject(),
      getTotalUpdates: new Subject(),
      fetchItems: void 0
    });

    TestBed.configureTestingModule({
      declarations: [ CartWidgetComponent ],
      providers: [
        { provide: CartService, useValue: ServiceMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
