import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatGridList,MatGridListModule } from "@angular/material/grid-list";
import { MatGridTile } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-view-details',
  imports: [MatGridList, MatGridTile, MatGridListModule, MatIconModule, CommonModule],
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent  implements OnInit {

  product: Product | undefined;
  constructor(private activatedRoute: ActivatedRoute,
    private router:Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // Initialization logic can go here
    this.product=this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }

  addToCart(productId: any){
    this.productService.addTocart(productId).subscribe(
      (response) =>{
        console.log(response);
      }, (error) =>{
        console.log(error);
      }
    );

  }
  // Additional methods for product view details can be added here
  buyProduct(productId: any) {
    this.router.navigate(['/buyproduct', { isSingleProductCheckout:true ,id:productId }]);
  }


}
