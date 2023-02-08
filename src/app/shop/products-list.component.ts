import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ForProductDirective } from './catalog/for-product.directive';

@Component({
  selector: 'products-list',
  template: `
    <ng-container *forProduct="let product ofType 'default'">
        <div class="product-image"></div>
        <h4>{{product.name}}</h4>
        <cart-item-control class="float-right" [product]="product"></cart-item-control>
    </ng-container>

    <div class="list-group">
      <div class="list-group-item" *ngFor="let product of products">
        <ng-container *ngTemplateOutlet="getTemplate(product); context: getContext(product)"></ng-container>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProductsListComponent implements OnInit, AfterContentInit, AfterViewInit {
  @Input()
  products;

  @ContentChildren(ForProductDirective, { read: ForProductDirective })
  productContainers = new QueryList<ForProductDirective>();

  @ViewChild(ForProductDirective, { read: ForProductDirective, static: true })
  defaultTemplate: ForProductDirective;

  templates: { [type: string]: TemplateRef<any> } = {};

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.productContainers.forEach(container => {
      this.templates[container.forProductOfType] = container.template;
    });
  }

  ngAfterViewInit() {
    this.templates['default'] = this.defaultTemplate.template;
  }

  getTemplate(product) {
    return this.templates[product.type || 'default'];
  }

  getContext(product) {
    return {
      $implicit: product,
    };
  }
}
