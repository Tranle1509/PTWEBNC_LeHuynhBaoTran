import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer-service';

@Component({
  selector: 'app-exercise18',
  standalone: false,
  templateUrl: './exercise18.html',
  styleUrl: './exercise18.css',
})
export class Exercise18Component implements OnInit {
  customerGroups: any[] = [];
  errMessage: string = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getGroupCustomers().subscribe({
      next: (data) => {
        this.customerGroups = data;
      },
      error: (err) => {
        this.errMessage = 'Không thể nạp dữ liệu: ' + err.message;
      },
    });
  }
}
