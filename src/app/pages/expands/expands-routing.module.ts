import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExpandsComponent} from './expands.component';

const routes: Routes = [
  { path: '', component: ExpandsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpandsRoutingModule { }
