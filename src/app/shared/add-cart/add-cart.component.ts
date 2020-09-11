import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.scss']
})
export class AddCartComponent implements OnInit {

  @Output() productAction = new EventEmitter<{ action: string, id: number, count: number}>();

  @Input() productId: number;
  @Input() currentCount: number;

  constructor() {
  }

  ngOnInit() {
  }

  onAdd() {
    this.currentCount++;

    this.productAction.emit({
      action: 'ADD',
      id: this.productId,
      count: this.currentCount
    });
  }

  onRemove() {
    this.currentCount--;

    this.productAction.emit({
      action: 'REMOVE',
      id: this.productId,
      count: this.currentCount
    });
  }
}
