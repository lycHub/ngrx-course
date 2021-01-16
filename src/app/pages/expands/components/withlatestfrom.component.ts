import {Component, OnInit, ChangeDetectionStrategy, ViewChildren, QueryList, ElementRef, AfterViewInit} from '@angular/core';
import {fromEvent} from 'rxjs';
import {withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'xm-withlastestfrom',
  template: `
    <div class="btns">
      <button #btn xmBtn xmRipples>source 1</button> |
      <button #btn xmBtn xmRipples>source 2</button>
    </div>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithlatestfromComponent implements OnInit, AfterViewInit {
  @ViewChildren('btn') readonly xmBtns: QueryList<ElementRef<HTMLButtonElement>>
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    /*
    * 一、两个流都必须有发出过值
    * 二、以sourceOne为主导发出值，才会被订阅
    * 二、最终的结果取两个流的最新值
    * */
    const sourceOne$ = fromEvent(this.xmBtns.first.nativeElement, 'click');
    const sourceTwo$ = fromEvent(this.xmBtns.last.nativeElement, 'click');
    sourceOne$.pipe(withLatestFrom(sourceTwo$)).subscribe(res => {
      console.log('res', res.map(event => event.timeStamp));
    });
  }

}
