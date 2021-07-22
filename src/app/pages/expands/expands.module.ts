import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExpandsComponent} from './expands.component';
import {ExpandsRoutingModule} from './expands-routing.module';
import {WithlatestfromComponent} from './components/withlatestfrom.component';
import {DirectivesModule} from '../../share/directives/directives.module';
import {PipesModule} from '../../share/pipes/pipes.module';
import {VirtualListComponent} from './components/virtual-list/virtual-list.component';
import {VirtualListDemoComponent} from './components/virtual-list/demo';
import {ForofDemoComponent} from './components/forof/demo';
import { MyForOfDirective } from './my-for-of.directive';
import { XmTemplateOutletDirective } from './directives/xm-template-outlet.directive';
import {TestComponent} from './components/test-use/test.component';
import {XmComponentOutletDirective} from './directives/xm-component-outlet.directive';


@NgModule({
  declarations: [
    ExpandsComponent,
    WithlatestfromComponent,
    VirtualListComponent,
    VirtualListDemoComponent,
    ForofDemoComponent,
    MyForOfDirective,
    XmTemplateOutletDirective,
    TestComponent,
    XmComponentOutletDirective
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    PipesModule,
    ExpandsRoutingModule
  ]
})
export class ExpandsModule { }
