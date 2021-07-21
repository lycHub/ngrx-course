import {Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit, Injector} from '@angular/core';
import {TestComponent} from './components/test-use/test.component';
import {NgComponentOutlet} from '@angular/common';
import {GreeterService} from './components/test-use/GreeterService';

@Component({
  selector: 'xm-expands',
  template: `
    <div class="expands">
      <p>
        <button (click)="changeContext()">changeContext</button>
      </p>
      <ng-container *ngComponentOutlet="testComp;content: myContent;injector: myInjector;"></ng-container>
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
  @ViewChild(NgComponentOutlet) readonly outlet: NgComponentOutlet;
  constructor(injector: Injector) {
    this.myInjector = Injector.create({
      providers: [{provide: GreeterService}], parent: injector}
    );
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.outlet) {
      // @ts-ignore
      this.outlet._componentRef.instance.click.subscribe(res => {
        console.log('clicked', res);
      });
    }
  }

  changeContext(): void {
    if (this.outlet) {
      // @ts-ignore
      this.outlet._componentRef.instance.changeTitle('abc');
    }
  }
}
