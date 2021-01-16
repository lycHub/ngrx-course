import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveComponentModule } from '@ngrx/component';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';
import {DirectivesModule} from '../../share/directives/directives.module';
import {MyForOfDirective} from './my-for-of.directive';


@NgModule({
  declarations: [MovieComponent, MyForOfDirective],
  imports: [
    CommonModule,
    MovieRoutingModule,
    DirectivesModule,
    ReactiveComponentModule
  ]
})
export class MovieModule { }
