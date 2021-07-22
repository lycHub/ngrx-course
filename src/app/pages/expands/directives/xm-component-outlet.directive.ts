import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
  Type,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[xmComponentOutlet]'
})
export class XmComponentOutletDirective implements OnChanges {
  @Input() xmComponentOutlet!: Type<any>;
  @Input() xmComponentOutletInjector: Injector;
  @Input() xmComponentOutletContent: any[][];
  componentRef: ComponentRef<any> | null = null;
  constructor(readonly viewContainerRef: ViewContainerRef, readonly cfr: ComponentFactoryResolver) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['xmComponentOutlet']) {
      this.viewContainerRef.clear();
      this.componentRef = null;
      if (this.xmComponentOutlet) {
        const injector = this.xmComponentOutletInjector || this.viewContainerRef.injector;
        const factory = this.cfr.resolveComponentFactory(this.xmComponentOutlet);
        this.componentRef = this.viewContainerRef.createComponent(
          factory, this.viewContainerRef.length, injector, this.xmComponentOutletContent
        );
      }
    }
  }
}
