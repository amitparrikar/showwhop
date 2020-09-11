import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    htmlRootElem;
    _showModal: boolean;

    @Input() productData;

    @Output()
    showModalChange = new EventEmitter<boolean>();

    @Input()
    get showModal() {
      return this._showModal;
    }

    set showModal(val: any) {
      this._showModal = val;
      this.showModalChange.emit(this._showModal);

      if (val === true) {
        this.htmlRootElem[0].style.overflowY = 'hidden';
      }

    }

    constructor(){
      this.htmlRootElem = document.getElementsByTagName('html');
    }

    ngOnInit(): void {

    }

    onModalClose() {
      this.showModal = false;
      this.htmlRootElem[0].style.overflowY = 'auto';

    }
 }
