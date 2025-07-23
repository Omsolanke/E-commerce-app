import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule,MatGridTile } from '@angular/material/grid-list';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { map } from 'rxjs';
import { ImageProcessingService } from '../image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCardActions, MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatCardActions, MatCardModule, MatIconModule, MatButtonModule, MatInputModule, FormsModule,MatFormFieldModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {
searchKey: any;



public loadMoreProducts() {
this.pageNumber = this.pageNumber + 1;
this.getAllProducts();
}

  pageNumber: number = 0;
productDetails: Product[] = [];

showLoadButton = false;

  constructor(private productService : ProductService,
              private imageProcessingService: ImageProcessingService,
              private router : Router) { }

  ngOnInit(): void {

    this.getAllProducts();
  }

  searchBykeyword(searchKeyWord: string) {
    console.log(searchKeyWord);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchKeyWord);
  }
   public getAllProducts( searchKey: string = ""): void {
    this.productService.getAllProducts(this.pageNumber.toString(), searchKey)
    .pipe(
      map((x: Product[], i) => 
        // Process the response if needed
         x.map((product: Product) => this.imageProcessingService.createImages(product))
      )
    )
    .subscribe(
     (resp: Product[]) => {
        console.log(resp);
        if (resp.length == 12) {
          this.showLoadButton = true; // Show button if 4 products are loaded
        } else {
          this.showLoadButton = false; // Hide button if not 4 products
        }
        resp.forEach(p => this.productDetails.push(p));
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  showProductDetails(productId: number) {
    this.router.navigate(['/productViewDetails', { productId: productId }]);
    
  }

}
