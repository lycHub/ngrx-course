import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExpandsComponent} from './expands.component';
import {ExpandsRoutingModule} from './expands-routing.module';
import {WithlatestfromComponent} from './components/withlatestfrom.component';
import {DirectivesModule} from '../../share/directives/directives.module';
import {PipesModule} from '../../share/pipes/pipes.module';
import {VirtualListComponent} from './components/virtual-list/virtual-list.component';
import {VirtualListDemoComponent} from './components/virtual-list/demo';


@NgModule({
  declarations: [
    ExpandsComponent,
    WithlatestfromComponent,
    VirtualListComponent,
    VirtualListDemoComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    PipesModule,
    ExpandsRoutingModule
  ]
})
export class ExpandsModule { }
