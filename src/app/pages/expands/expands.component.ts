import {Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit, Injector} from '@angular/core';
import {TestComponent} from './components/test-use/test.component';
import {NgComponentOutlet} from '@angular/common';
import {GreeterService} from './components/test-use/GreeterService';
import {XmComponentOutletDirective} from './directives/xm-component-outlet.directive';

@Component({
  selector: 'xm-expands',
  template: `
    <div class="expands">
      <p>
        <button (click)="changeContext()">changeContext</button>
      </p>
      <ng-container *xmComponentOutlet="testComp;content: myContent;injector: myInjector;"></ng-container>
    </div>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpandsComponent implements OnInit, AfterViewInit {
  testComp = TestComponent;
  myInjector: Injector;
  myContent = [[document.createTextNode('Ahoj'), document.createTextNode('Svet')]];
  @ViewChild(XmComponentOutletDirective) readonly outlet: XmComponentOutletDirective;
  constructor(injector: Injector) {
    this.myInjector = Injector.create({
      providers: [{provide: GreeterService}], parent: injector}
    );
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.outlet) {
      this.outlet.componentRef.instance.click.subscribe(res => {
        console.log('clicked', res);
      });
    }
  }

  changeContext(): void {
    if (this.outlet) {
      this.outlet.componentRef.instance.changeTitle('abc');
    }
  }
}
