import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {MovieStore} from './movie-store.service';

@Component({
  selector: 'xm-movie',
  template: `
    <div class="movies">
      <button xmBtn xmRipples (click)="initMovie()">init movies</button>
      <button xmBtn xmRipples (click)="addMovie()">add movie</button>
      <button xmBtn xmRipples (click)="addMovies()">add movies</button>
      <button xmBtn xmRipples (click)="addXmlyMovies()">add xmly movies</button>
      <button xmBtn xmRipples (click)="resetMovies()">reset movies</button>
      <h3>movie list</h3>
      <ul>
        <li *ngFor="let item of movies$ | async">{{ item.title }}</li>
      </ul>
    
      <h4>hot movies</h4>
      <ul>
        <li *ngFor="let item of hotMovies | async">{{ item.title }}</li>
      </ul>
    </div>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MovieStore]
})
export class MovieComponent implements OnInit {
  movies$ = this.movieStore.movies$;
  hotMovies = this.movieStore.hotMovies$;
  constructor(private movieStore: MovieStore) { }

  ngOnInit(): void {
  }

  initMovie(): void {
    this.movieStore.initMovie();
  }

  addMovie(): void {
    this.movieStore.addMovie({
      id: 'm4',
      title: '进击的巨人'
    });
  }

  addXmlyMovies(): void {
    this.movieStore.addXmlyMovies(3);
  }

  addMovies(): void {
    this.movieStore.addMovies([
      {
        id: 'm6',
        title: '恶魔奶爸'
      },
      {
        id: 'm5',
        title: '灌篮高手'
      }
    ]);
  }

  resetMovies(): void {
    this.movieStore.resetMovie();
  }

}
