import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {BookStoreModule} from '../../store/book';
import {selectAllBook, selectBookFeature, selectedBook} from '../../store/book/selectors';
import {Book} from '../../store/book/reducer';
import {addBook, clear, deleteBook, setSelectedBookId, updateBook} from '../../store/book/action';
import {Observable} from 'rxjs';

let flag = 0;

@Component({
  selector: 'xm-book',
  template: `
    <div class="books">
      <button xmBtn xmRipples (click)="addOneBook()">add a book</button> |
      <button xmBtn xmRipples (click)="updateOneBook()">update a book</button> |
      <button xmBtn xmRipples (click)="deleteOneBook()">delete a book</button> |
      <button xmBtn xmRipples (click)="clear()">clear all book</button> |
      <button xmBtn xmRipples (click)="select()">select a book</button> |
      <button xmBtn xmRipples (click)="select2()">select a book2</button>
      <ul>
        <li *ngFor="let book of books$ | ngrxPush">{{ book.title }}</li>
      </ul>
      <p *ngrxLet="selectedBook$ as s">
        当前选中的book：
        {{ s?.title }}
      </p>
    </div>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit {
  books$: Observable<Book[]>;
  selectedBook$: Observable<Book>;
  constructor(readonly store$: Store<BookStoreModule>) { }

  ngOnInit(): void {
    const selectBookStore = this.store$.select(selectBookFeature);
    this.books$ = selectBookStore.pipe(select(selectAllBook));
    this.selectedBook$ = selectBookStore.pipe(select(selectedBook));
  }

  addOneBook(): void {
    this.store$.dispatch(addBook(generateNewBook()));
  }

  updateOneBook(): void {
    this.store$.dispatch(updateBook({
      id: 'id_1',
      changes: {
        title: '西游记改'
      }
    }));
  }

  deleteOneBook(): void {
    this.store$.dispatch(deleteBook({ id: 'id_1' }));
  }

  clear(): void {
    this.store$.dispatch(clear());
  }

  select(): void {
    this.store$.dispatch(setSelectedBookId({ id: 'id_1' }));
  }

  select2(): void {
    this.store$.dispatch(setSelectedBookId({ id: 'id_3' }));
  }
}


function generateNewBook(): Book {
  return {
    id: 'id_' + flag++,
    title: '西游记' + flag,
    author: 'zgcf' + flag,
    version: 'v' + flag
  };
}
