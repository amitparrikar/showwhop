import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCartComponent } from './add-cart/add-cart.component';
import { MrpDisplayComponent } from './mrp-display/mrp-display.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        MrpDisplayComponent,
        AddCartComponent,
        ModalComponent
    ],
    imports: [
      CommonModule,
      FormsModule
    ],
    exports: [MrpDisplayComponent, AddCartComponent, ModalComponent],
    entryComponents: []
})
export class SharedModule {

}
