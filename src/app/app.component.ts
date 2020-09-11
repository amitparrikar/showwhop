import { Component } from '@angular/core';
import { CartService } from './services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cartCount = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    cartService.getTotalCartCount().subscribe(data => {
      this.cartCount = data.count;
    });
  }

  onViewCart() {
    this.router.navigate(['cart']);
  }
}
