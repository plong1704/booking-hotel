import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { ReservationService } from '../../services/reservation.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-check-payment-status',
  templateUrl: './check-payment-status.component.html',
  styleUrls: ['./check-payment-status.component.scss']
})
export class CheckPaymentStatusComponent implements OnInit {
  headerComponent!: HTMLElement;
  payment_id!: string;

  constructor(private paymentService: PaymentService, private reservationService: ReservationService, private cartService: CartService) { }

  isPaid = true;
  showWaitingOverlay: boolean = false;

  ngOnInit(): void {
    const finalItems = localStorage.getItem("finalItems") ? JSON.parse(localStorage.getItem("finalItems")!) : [];
    const chosenItems = localStorage.getItem("chosenItems") ? JSON.parse(localStorage.getItem("chosenItems")!) : [];
    const ids = chosenItems.map((item: any) => item.id);

    this.showWaitingOverlay = true;
    const access_token = localStorage.getItem('payment_token') || '';
    this.payment_id = localStorage.getItem('payment_id') || '';
    this.paymentService.getPaymentStatus(access_token, this.payment_id).subscribe((res) => {
      if (res.status != "APPROVED") {
        this.isPaid = false;
      } else {
        this.isPaid = true;
        this.reservationService.saveAllReservation(finalItems).subscribe(
          {
            next: (res) => {
              this.cartService.deleteItemsFromCart(ids).subscribe((res) => {
                console.log(res);
                // localStorage.removeItem("sessionId");
                localStorage.removeItem("finalItems");
                localStorage.removeItem("chosenItems");
                localStorage.removeItem("payment_token");
                localStorage.removeItem("payment_id");
              });
            },
            error: (err) => {
              console.log("error", err);
            }
          }
        );
      }
      this.headerComponent = document.getElementsByClassName('header-container').item(0) as HTMLElement;
      this.headerComponent.style.display = "none";
      this.showWaitingOverlay = false;
    });
  }
  ngOnDestroy(): void {
    this.headerComponent.style.display = "flex";
  }
}
