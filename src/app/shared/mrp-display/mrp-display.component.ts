import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-mrp-display]',
  templateUrl: './mrp-display.component.html',
  styleUrls: ['./mrp-display.component.scss'],
})
export class MrpDisplayComponent implements OnInit {

  @Input() mP: number;
  @Input() sP: number;
  @Input() unit: string;
  @Input() vat: number;
  @Input() gst: number;

  strike = false;
  showVat = false;
  showGst = false;

  constructor() {}

  ngOnInit() {
    if (+this.sP < +this.mP) {
      this.strike = true;
    }

    if (+this.vat > 0) {
      this.showVat = true;
      this.showGst = false;
    } else if (+this.gst > 0) {
      this.showVat = false;
      this.showGst = true;
    }
  }

}
