import {Component, EventEmitter, OnInit} from '@angular/core';
import {GreeterService} from './GreeterService';

@Component({
  selector: 'xm-test',
  templateUrl: './test.component.html'
})
export class TestComponent implements OnInit {
  title = 'test works!!!!';
  click = new EventEmitter<string>();
  constructor(readonly greeter: GreeterService) { }

  ngOnInit(): void {
  }

  changeTitle(title: string): void {
    this.title = title;
  }

  changeSuffix(): void {
    this.greeter.setSuffix('&&');
  }

  handleClick(): void {
    this.click.emit('clicked !!');
  }

}
