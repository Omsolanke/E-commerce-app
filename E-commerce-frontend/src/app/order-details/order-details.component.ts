import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../_services/product.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  imports:[MatTableModule,MatButtonModule,CommonModule,MatButtonToggleModule]
})
export class OrderDetailsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'productName', 'name', 'address', 'contact', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();

  status : string = 'All';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);
  }

  getAllOrderDetailsForAdmin(status:string) {
    this.productService.getAllOrderDetailsForAdmin(status).subscribe(
      (resp) => {
        console.log(resp);
        this.dataSource.data = resp;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  markAsDelivered(orderId : any){
    console.log(orderId);
    this.productService.markAsDelivered(orderId).subscribe(
     (response) =>{
      this.getAllOrderDetailsForAdmin(this.status);
      console.log(response);
     }, (error) =>{
      console.log(error);
     }
    );
  }
}
