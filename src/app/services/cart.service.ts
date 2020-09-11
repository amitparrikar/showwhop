import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  LS_MY_CART = 'LS_MY_CART';
  myCart: Array<{id: number, count: number}> = [];
  totalCartCount = 0;

  private totalCountEvent = new EventEmitter<{count: number}>();

  constructor(
    private http: HttpClient
  ) {
    this.getCartFromLS();

    this.myCart.forEach((item, indx) => {
      this.totalCartCount += item.count;
    });

    setTimeout(() => {
      this.totalCountEvent.emit({count: this.totalCartCount});
    }, 200);
  }

  getAllShopingData() {
    return this.http.get('./../../assets/data.json').pipe(
      map(result => {
        return result;
      })
    );
  }

  updateCart(product: any): any {
    let cartIndex = 0;
    let isPresent = false;
    this.totalCartCount = 0;

    this.myCart.forEach((item, indx) => {
      if (+item.id === +product.id) {
        isPresent = true;
        item.count = product.count;
        cartIndex = indx;
      }

      this.totalCartCount += item.count;
    });

    if (!isPresent) {
      this.myCart.push({ id: product.id, count: 1});

      this.totalCartCount += product.count;
    }

    if (product.count === 0) {
      this.myCart.splice(cartIndex, 1);
    }

    this.totalCountEvent.emit({count: this.totalCartCount});
    this.saveCartToLS(this.myCart);
  }

  getTotalCartCount() {
    return this.totalCountEvent;
  }

  getCart() {
    return this.myCart;
  }

  getCartDetails(allProducts) {
    const details = [];
    const myCart = this.getCart();

    for (let i = 0; i < myCart.length; i++) {
      for (let j = 0; j < allProducts.length; j++) {

        if (+this.myCart[i].id === +allProducts[j].id) {

          allProducts[j].count = this.myCart[i].count;
          details.push(allProducts[j]);

          break;
        }
      }
    }

    return details;
  }

  orderCartItems() {
    //wa link to format and open order
  }

  saveCartToLS(cartData) {
    window.localStorage.setItem(this.LS_MY_CART, JSON.stringify(cartData));
  }

  getCartFromLS() {
    const cartData = window.localStorage.getItem(this.LS_MY_CART);

    if (cartData) {
      this.myCart = JSON.parse(cartData);
    }
  }

  emptyCart() {
    this.myCart = [];
    this.totalCartCount = 0;

    this.totalCountEvent.emit({count: this.totalCartCount});
    this.saveCartToLS(this.myCart);
  }
}
