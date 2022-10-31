import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { TicketService } from 'src/app/services/ticket.service';
import { UserdataService } from 'src/app/services/userdata.service';
@Component({
  selector: 'app-payment-section',
  templateUrl: './payment-section.component.html',
  styleUrls: ['./payment-section.component.css']
})
export class PaymentSectionComponent implements OnInit {

  constructor(private ticket:TicketService, private payment: PaymentService, private user: UserdataService,private router:Router) { }

  ngOnInit(): void {
  }

}
