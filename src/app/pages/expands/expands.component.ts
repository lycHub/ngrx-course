import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'xm-expands',
  template: `
    <div class="expands">
      <xm-for-of-demo></xm-for-of-demo>
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
