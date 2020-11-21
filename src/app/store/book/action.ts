import { Update } from '@ngrx/entity';
import {createAction, props} from '@ngrx/store';
import {Book} from './reducer';

export const addBook = createAction('[Book] Add a book', props<Book>());
export const updateBook = createAction('[Book] Update a book', props<Update<Book>>());
export const deleteBook = createAction('[Book] Delete a book', props<{ id: string }>());
export const clear = createAction('[Book] Clear all book');

export const setSelectedBookId = createAction('[Book] Selected book', props<{ id: string }>());
