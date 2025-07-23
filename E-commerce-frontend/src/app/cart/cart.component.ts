import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MatTable } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatHeaderCellDef } from '@angular/material/table';
import { MatIconModule } from "@angular/material/icon";
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-cart',
  imports: [MatTable, MatHeaderCellDef, MatTableModule, MatIconModule,MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
    
    displayedColumns: string[] = ['Name','Description','Price','Discounted Price','Action'];
   
    cartDetails: any = [];
    constructor(private productService: ProductService,
      private router:Router
    ){

    }

     ngOnInit(): void {
      this.getCartDetails();
    }

    delete(cartId:any){
    console.log(cartId);
    this.productService.deleteCartItem(cartId).subscribe(
      (resp) =>{
        console.log(resp);
        this.getCartDetails();
      }, (err) =>{
        console.log(err);
      }
    );
    }
    checkout(){
        this.router.navigate(['/buyproduct', { isSingleProductCheckout:false ,id:0 }]);

    //   this.productService.getProductDetails('false', '0').subscribe(
    //     (resp) =>{
    //       console.log(resp);
    //     },(err) =>{
    //       console.log(err);
    //     }
    //   );

    }
    getCartDetails(){
      this.productService.getCartDetails().subscribe(
        (response) =>{
          console.log(response);
          this.cartDetails = response;
        },
        (error) =>{
          console.log(error);
        }
      );
    }
}
