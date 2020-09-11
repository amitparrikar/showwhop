import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItemList = [];
  productCatalog = [];

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartService.getAllShopingData().subscribe(
      (results: any) => {
        this.productCatalog = results;
        this.cartItemList = this.cartService.getCartDetails(this.productCatalog);
      }
    );
  }


  productAction(product) {
    this.cartService.updateCart(product);
  }

  deleteCartItem(id, index) {
    this.cartItemList.splice(index, 1);

    this.cartService.updateCart({
      action: 'REMOVE',
      id,
      count: 0
    });
  }

  onNavigateBack() {
    this.router.navigate(['']);
  }

  onPlaceOrder() {
    let waMessage = `https://api.whatsapp.com/send?phone=+919049051067&text=*Following is my order:*%0a`;

    this.cartItemList = this.cartService.getCartDetails(this.productCatalog);

    this.cartItemList.forEach((item, indx) => {
      if (item.count > 0) {
        waMessage += `${indx + 1}) ${item.title} ${item.packSize}    _(${item.count} qty)_%0a`;
      }
    });

    waMessage += `%0aKindly contact me. Thanks.`;

    window.open(waMessage);

    this.cartService.emptyCart();
    this.router.navigate(['']);

  }


}
