import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveComponentModule } from '@ngrx/component';
import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import {DirectivesModule} from '../../share/directives/directives.module';


@NgModule({
  declarations: [BookComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    DirectivesModule,
    ReactiveComponentModule
  ]
})
export class BookModule { }
