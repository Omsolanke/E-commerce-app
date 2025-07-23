import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../_model/product.model'; // ✅ Import Product interface
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-product-details',
   imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule, MatDialogModule, MatInputModule,FormsModule],
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css'] // ✅ Fixed typo (was styleUrl)
})
export class ShowProductDetailsComponent implements OnInit {
 
  showLoadMoreProductButton: boolean = false;
  showTable: boolean = false;
  pageNumber: number = 0;
  productDetails:Product[] = [];
   displayedColumns: string[] = ['Id', 'Product Name', 'Product Description' , 'Product Discounted Price','Product Actual Price','Images','Edit','Delete'];

  products: Product[] = []; // ✅ Store fetched products here
searchKey: any;

  constructor(private productService: ProductService,
              public  imagesDialog: MatDialog,
              private imageProcessingService: ImageProcessingService ,
              private router: Router

  ) {}


  ngOnInit(): void {
    this.getAllProducts(); // ✅ Fetch all products on init
  }
  
  searchBykeyword(searchKey:any){
    console.log(searchKey);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchKey);
    

  }

  onEditProduct(productId: any) {
  // Navigate or open modal to edit product
  this.router.navigate(['/addNewProduct', {productId: productId}]);

}

ShowImages(product: Product) {
  // Open a dialog or navigate to the images page
  console.log('Show images for', product);
  this.imagesDialog.open(ShowProductImagesDialogComponent, {
   data:{
    images: product.productImages
   },
    height: '400px',
    width: '600px',
    
  });
}
onDeleteProduct(productId: any) {
  this.productService.deleteProduct(productId).subscribe(
    (resp) =>{
     this.getAllProducts();
    },
    (error:HttpErrorResponse) =>{
      console.log(error);
    }
  );
}


  public getAllProducts(searchKeyWord:string = ""): void {
    this.showTable = false; 
    this.productService.getAllProducts(this.pageNumber.toString(), searchKeyWord)
    .pipe(
      map((x: Product[], i) => 
        // Process the response if needed
         x.map((product: Product) => this.imageProcessingService.createImages(product))
      )
    )
    .subscribe(
     (resp: Product[]) => {
        console.log(resp);
        resp.forEach((product=>this.productDetails.push(product)));
        this.showTable = true; 
        // this.productDetails = resp;

        if(resp.length == 12) {
          this.showLoadMoreProductButton = true;
        } else {
          this.showLoadMoreProductButton = false;
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching products:', error);
      }
    );  
  }
  loadMoreProducts(){

    this.pageNumber= this.pageNumber + 1;
    this.getAllProducts();

  }
}
