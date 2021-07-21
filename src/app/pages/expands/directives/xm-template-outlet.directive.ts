import {Directive, EmbeddedViewRef, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef} from '@angular/core';

type WithUndefinedAndNull<T> = T | undefined | null;

@Directive({
  selector: '[xmTemplateOutlet]'
})
export class XmTemplateOutletDirective implements OnChanges {
  @Input() xmTemplateOutlet!: WithUndefinedAndNull<TemplateRef<any>>;
  @Input() xmTemplateOutletContext: WithUndefinedAndNull<object>;
  private viewRef: WithUndefinedAndNull<EmbeddedViewRef<any>>;
  constructor(readonly viewContainer: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['xmTemplateOutlet']) {
      if (this.viewRef) {
        this.viewContainer.remove(this.viewContainer.indexOf(this.viewRef));
      }
      this.viewRef = this.viewContainer.createEmbeddedView(this.xmTemplateOutlet, this.xmTemplateOutletContext);
    } else if (this.viewRef && changes['xmTemplateOutletContext'] && this.xmTemplateOutletContext) {
      // @ts-ignore
      this.viewRef.context = this.xmTemplateOutletContext;
    }
  }

}
