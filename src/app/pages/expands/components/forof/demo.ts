import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'xm-for-of-demo',
  template: `
    <div class="demo-box">
      <div class="actions">
        <button xmBtn xmRipples (click)="genarateBigData(100)">refresh</button> |
        <button xmBtn xmRipples (click)="addData(100)">add items</button> |
        <button xmBtn xmRipples (click)="subData(100)">sub items</button> |
        <button xmBtn xmRipples (click)="list = []">clear</button>
      </div>
      <div class="scroll-box">
        <div class="list">
          <div class="item" *xmMyFor="let item of list; index as i; trackBy: trackByFunc">{{ item }}-{{ i }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
          .demo-box {
              width: 800px;
              margin: 0 auto;
          }
      .demo-box .actions {
        margin-bottom: 12px;
      }
      .scroll-box {
        max-height: 300px;
        overflow-y: auto;
      }
      .scroll-box .list .item {
        padding: 10px 20px;
        background-color: #666;
        color: #fff;
        border-bottom: 1px solid #fff;
      }
      .scroll-box .list .item:hover {
        background-color: #999;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForofDemoComponent implements OnInit {
  list: string[] = [];
  constructor() {
    this.genarateBigData();
  }

  ngOnInit(): void {
  }

  genarateBigData(count = 200): void {
    this.list = [];
    for (let a = 0; a < count; a++) {
      this.list.push('item' + a);
    }
  }
  addData(count = 100): void {
    const len = this.list.length;
    for (let a = 0; a < count; a++) {
      this.list.push('item' + (len + a));
    }
    this.list = this.list.slice();
  }
  subData(count = 20): void {
    this.list.splice(0, count);
    this.list = this.list.slice();
  }

  trackByFunc(index: number, item: string): string {
    return item;
  }
}
