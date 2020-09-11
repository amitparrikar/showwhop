import { Component, OnInit } from '@angular/core';

import { CartService } from './../services/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  listData: any;
  myCart = [];
  queryText: string;

  showModal = false;
  modalProdData = null;

  constructor(
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.myCart = this.cartService.getCart();

    this.cartService.getAllShopingData().subscribe(result => {
      this.listData = result;

      for (var i = 0; i < this.listData.length; i++) {
        for (var j = 0; j < this.myCart.length; j++) {
          if (+this.listData[i].id === +this.myCart[j].id) {
            this.listData[i].count = this.myCart[j].count;
            break;
          }
        }
      }
    });
  }

  productAction(product) {
    this.cartService.updateCart(product);
  }

  onSendQuery() {
    let waQueryLink = `https://api.whatsapp.com/send?phone=+919049051067&text=*Following is my query:*%0a%0a${this.queryText}`;
    waQueryLink += `%0a%0aKindly contact me. Thanks.`;

    window.open(waQueryLink);
  }

  onViewProduct(product) {
    this.showModal = true;
    this.modalProdData = product;
  }

}
