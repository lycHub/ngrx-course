import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit, OnChanges, SimpleChanges, Input, TemplateRef, ViewChild, ElementRef
} from '@angular/core';
import {ScrollService} from '../../../../services/tools/scroll.service';

interface VirtualBase {
  start: number;
  end: number;
  scrollTop: number;
  paddingTop: number;
  paddingBottom: number;
}

interface VirtualItemContext {
  item: any;
  index: number;
}

@Component({
  selector: 'xm-virtual-list',
  template: `
    <div
        class="virtual-list"
        #virtualWrap
        (scroll)="onScroll()"
        [style]="{
          maxHeight: maxHeight + 'px',
          overflowY: 'auto'
        }">
      <div class="scroll-el" [style]="{ paddingTop: base.paddingTop + 'px', paddingBottom: base.paddingBottom + 'px' }">
        <ng-container *ngFor="let item of visibleList; index as i">
          <ng-template *ngTemplateOutlet="itemTpl; context: { $implicit: item, index: base.start + i }"></ng-template>
        </ng-container>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualListComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() list: any[];
  @Input() itemTpl: TemplateRef<VirtualItemContext>;
  @Input() size: number;
  @Input() remain: number;
  @Input() additional: number; // 额外渲染多少条
  @Input() start = 0; // 从第几条开始
  @Input() offset = 0; // 默认的scrollTop
  @ViewChild('virtualWrap') virtualWrapEl: ElementRef<HTMLElement>;
  base: VirtualBase = {
    start: 0,
    end: 0,
    scrollTop: 0,
    paddingTop: 0,
    paddingBottom: 0
  }
  visibleList: any[] = [];
  constructor(private scrollServe: ScrollService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { list } = changes;
    // console.log('changes list', list);
    if (list && !list.firstChange) {
      this.onScroll(true);
    }
  }

  ngOnInit(): void {
    this.refresh(true);
  }

  ngAfterViewInit(): void {
    if (this.start) {
      const start = this.getZone(this.start).start;
      this.scrollServe.setScrollTop(this.virtualWrapEl.nativeElement, start * this.size);
    } else if (this.offset) {
      this.scrollServe.setScrollTop(this.virtualWrapEl.nativeElement, this.offset);
    }
  }

  onScroll(forceUpdate = false): void {
    if (this.list.length > this.keeps) {
      this.updateZone(this.virtualWrapEl.nativeElement.scrollTop, forceUpdate);
    } else {
      this.refresh();
    }
  }

  refresh(init = false): void {
    if (init) {
      this.base.start = this.list.length > this.start + this.keeps ? this.start : 0;
    } else {
      this.base.start = 0;
    }
    this.base.end = this.getEndIndex(this.base.start);
    this.updateContainer();
    this.visibleList = this.filterNodes();
  }

  private updateZone(offset: number, forceUpdate: boolean): void {
    const overs = Math.floor(offset / this.size);
    const zone = this.getZone(overs);
    const additional = this.additional || this.remain;
    let shouldRefresh = false;
    if (forceUpdate) {
      shouldRefresh = true;
    } else {
      if (overs < this.base.start) { // 向上滚
        shouldRefresh = true;
      } else {
        if (zone.isLastZone) {
          if ((this.base.start !== zone.start) || (this.base.end !== zone.end)) {
            shouldRefresh = true;
          }
        } else {
          const arriveAtNextZone = overs >= this.base.start + additional;
          shouldRefresh = arriveAtNextZone;
        }
      }
    }
    // console.log('shouldRefresh', shouldRefresh);
    if (shouldRefresh) {
      this.base.start = zone.start;
      this.base.end = zone.end;
      this.updateContainer();
      this.visibleList = this.filterNodes();
    }
  }

  private updateContainer(): void {
    const total = this.list.length;
    const needPadding = total > this.keeps;
    const paddingTop = this.size * (needPadding ? this.base.start : 0);
    let paddingBottom = this.size * (needPadding ? total - this.keeps : 0) - paddingTop;
    if (paddingBottom < this.size) {
      paddingBottom = 0;
    }
    this.base.paddingTop = paddingTop;
    this.base.paddingBottom = paddingBottom;
  }
  private filterNodes(): any[] {
    if (this.list.length) {
      const nodes: any[] = [];
      for (let a = this.base.start; a <= this.base.end; a++) {
        nodes.push(this.list[a]);
      }
      return nodes;
    }
    return [];
  }


  private getZone(startIndex: number): { start: number; end: number; isLastZone: boolean; } {
    let start = Math.max(0, startIndex);
    const remainCount = this.list.length - this.keeps;
    const isLastZone = start >= remainCount;
    if (isLastZone) {
      start = Math.max(0, remainCount);
    }
    return {
      start,
      end: this.getEndIndex(start),
      isLastZone
    };
  }

  private getEndIndex(start: number): number {
    const end = start + this.keeps - 1;
    return this.list.length ? Math.min(this.list.length - 1, end) : end;
  }

  get maxHeight(): number {
    return this.size * this.remain;
  }
  get keeps(): number {
    return this.remain + (this.additional || this.remain);
  }
}
