import {
  Directive,
  DoCheck, EmbeddedViewRef,
  Input, IterableChangeRecord,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef
} from '@angular/core';

interface XmMyForOfContext<T> {
  $implicit: T;
  index: number;
}

@Directive({
  selector: '[xmMyForOf]'
})
export class MyForOfDirective<T> implements DoCheck {
  private list: T[] = [];
  private trackByFn: TrackByFunction<T>;
  private differ: IterableDiffer<T>;
  @Input()
  set xmMyForOf(forOf: T[]) {
    // console.log('set list', forOf);
    this.list = forOf;
  }

  @Input()
  set xmMyForTrackBy(fn: TrackByFunction<T>) {
    this.trackByFn = fn;
  }
  get xmMyForTrackBy(): TrackByFunction<T> {
    return this.trackByFn;
  }
  constructor(
    private templateRef: TemplateRef<XmMyForOfContext<T>>,
    private viewContainer: ViewContainerRef,
    private differs: IterableDiffers
  ) { }

  ngDoCheck(): void {
    if (!this.differ && this.list) {
      try {
        this.differ = this.differs.find(this.list).create(this.xmMyForTrackBy);
      } catch {
        throw new Error('请传入可迭代的变量如：Array');
      }
    }
    if (this.differ) {
      const changes = this.differ.diff(this.list);
      this.applayChange(changes);
    }
  }
  private applayChange(changes: IterableChanges<T>): void {
    let needUpdateIndex = false;
    if (changes?.forEachOperation) {
      changes.forEachOperation((record: IterableChangeRecord<T>, adjustedPreviousIndex: number, currentIndex: number) => {
        if (record.previousIndex == null) { // 新的
          this.viewContainer.createEmbeddedView(this.templateRef, {
            $implicit: record.item,
            index: currentIndex
          }, currentIndex);
        } else if (currentIndex == null) { // 删除
          this.viewContainer.remove(adjustedPreviousIndex);
        } else if (adjustedPreviousIndex !== null) {
          // console.log('record', record);
          // console.log('index', adjustedPreviousIndex, currentIndex);
          const view = this.viewContainer.get(adjustedPreviousIndex);
          this.viewContainer.move(view, currentIndex);
          needUpdateIndex = true;
        }
      });
    }
    if (needUpdateIndex && this.viewContainer.length) {
      for (let a = 0; a < this.viewContainer.length; a++) {
        const view = this.viewContainer.get(a) as EmbeddedViewRef<XmMyForOfContext<T>>;
        view.context.index = a;
      }
    }
  }
}
