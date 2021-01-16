import {
  Directive,
  DoCheck,
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
    if (changes?.forEachOperation) {
      changes.forEachOperation((record: IterableChangeRecord<T>, adjustedPreviousIndex: number, currentIndex: number) => {
        console.log('index', adjustedPreviousIndex, currentIndex);
      });
    }
  }
}
