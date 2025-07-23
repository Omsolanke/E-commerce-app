import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-my-orders',
  imports: [MatTableModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit{

 displayedColumns = ["Name", "Contact No.", "Amount", "Status"];
 myOrderDetails: MyOrderDetails[] = [];

constructor(private productService: ProductService){

}

  ngOnInit(): void {
    this.getOrderDetails();
    
  }

  getOrderDetails(){
    this.productService.getMyOrders().subscribe(
        (resp:MyOrderDetails[]) =>{
        console.log(resp);
        this.myOrderDetails = resp;
      }, (err) =>{
        console.log(err);
      }
    );
    
  }

}
