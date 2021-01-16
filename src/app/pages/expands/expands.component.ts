import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'xm-expands',
  template: `
    <div class="expands">
      <xm-virtual-list-demo></xm-virtual-list-demo>
    </div>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpandsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
